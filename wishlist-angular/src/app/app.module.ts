import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injectable, InjectionToken, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store, StoreModule as NgRxStoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AppComponent} from './main/app.component';
import {DestinoViajeComponent} from './components/destino-viaje/destino-viaje.component';
import {ListaDestinosComponent} from './components/lista-destinos/lista-destinos.component';
import {DestinoDetalleComponent} from './components/destino-detalle/destino-detalle.component';
import {FormDestinoViajeComponent} from './components/form-destino-viaje/form-destino-viaje.component';
import {
  DestinoViajeEffects,
  DestinoViajeState, InitDataAction,
  initializeDestinoViajeState,
  reducerDestinoViajes
} from "./models/DestinoViajeState.model";
import {ActionReducerMap} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {LoginComponent} from './components/login/login/login.component';
import {ProtectedComponent} from './components/protected/protected/protected.component';
import {UsuarioLogueadoGuard} from "./guards/usuario-logueado/usuario-logueado.guard";
import {AuthService} from "./services/auth.service";
import {VuelosComponentComponent} from './components/vuelos/vuelos-component/vuelos-component.component';
import {VuelosMainComponentComponent} from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import {VuelosMasInfoComponentComponent} from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import {VuelosDetalleComponentComponent} from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import {ReservasModule} from './reservas/reservas.module';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from "@angular/common/http";
import Dexie from "dexie";
import {DestinoViaje} from "./models/DestinoViaje.model";
import {from, Observable} from "rxjs";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {flatMap} from "rxjs/internal/operators";
import {NgxMapboxGLModule} from "ngx-mapbox-gl";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EspiameDirective } from './espiame.directive';


/* App Config */
export interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: "http://localhost:3000",
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');


/* Rutas */
export const childrenRoutesVuelos: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: VuelosMainComponentComponent},
  {path: 'mas-info', component: VuelosMasInfoComponentComponent},
  {path: ':id', component: VuelosDetalleComponentComponent}
];

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  {path: 'destino/:id', component: DestinoDetalleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'protected', component: ProtectedComponent, canActivate: [UsuarioLogueadoGuard]},
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [UsuarioLogueadoGuard],
    children: childrenRoutesVuelos
  }
];

/* Redux */
export interface AppState {
  destinos: DestinoViajeState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinoViajes
}

const reducersInitialState = {
  destinos: initializeDestinoViajeState()
}


/* Init Data */
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinoViajeState();
}

@Injectable()
class AppLoadService {
  constructor(private  store: Store<AppState>, private http: HttpClient) {
  }

  async initializeDestinoViajeState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const request = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', {headers: headers});
    const response: any = await this.http.request(request).toPromise();
    this.store.dispatch(new InitDataAction(response.body));
  }
}

/* Dexie DB */
export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {
  }
}

@Injectable({
  providedIn: 'root'
})

export class Database extends Dexie {
  destinos: Dexie.Table<DestinoViaje>;
  translations: Dexie.Table<Translation>

  constructor() {
    super('Database');
    this.version(1).stores({
      destinos: '++id, nombre, descripcion, url'
    });
    this.version(2).stores({
      destinos: '++id, nombre, descripcion, url',
      translations: '++id, lang , key, value'
    });
  }
}

export const db = new Database();


/* I18N  */
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
      .where('lang')
      .equals(lang)
      .toArray()
      .then(results => {
        if (results.length === 0) {
          return this.http
            .get<Translation[]>(`${APP_CONFIG_VALUE.apiEndpoint}/api/translation?lang=${lang}`)
            .toPromise()
            .then(apiResults => {
              db.translations.bulkAdd(apiResults);
              return apiResults;
            });
        }
        return results;
      }).then((traducciones) => {
        return traducciones;
      }).then((traducciones) => {
        return traducciones.map((t) => ({[t.key]: t.value}));
      });

    return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    EspiameDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'ignore',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
    NgRxStoreModule.forRoot(reducers, {
      initialState: reducersInitialState,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    EffectsModule.forRoot([DestinoViajeEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule,
    HttpClientModule,
    NgxMapboxGLModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    AppLoadService,
    Database,
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    {provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
