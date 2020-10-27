import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule as NgRxStoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from './main/app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/DestinosApiClient.model';
import {
  DestinoViajeEffects,
  DestinoViajeState,
  intializeDestinoViajeState,
  reducerDestinoViajes
} from "./models/DestinoViajeState.model";
import {ActionReducerMap} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import {UsuarioLogueadoGuard} from "./guards/usuario-logueado/usuario-logueado.guard";
import {AuthService} from "./services/auth.service";
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';

export const childrenRoutesVuelos:Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: VuelosMainComponentComponent},
  { path: 'mas-info', component: VuelosMasInfoComponentComponent},
  { path: ':id', component: VuelosDetalleComponentComponent}
];

const routes: Routes= [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino/:id', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent},
  { path: 'protected', component: ProtectedComponent, canActivate: [UsuarioLogueadoGuard] },
  { path: 'vuelos', component: VuelosComponentComponent, canActivate: [UsuarioLogueadoGuard], children: childrenRoutesVuelos }
];

/* Redux */
export interface AppState {
  destinos: DestinoViajeState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinoViajes
}

const reducersInitialState = {
  destinos: intializeDestinoViajeState()
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
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState,
    runtimeChecks:{
     strictStateImmutability: false,
     strictActionImmutability:false
    }}),
    EffectsModule.forRoot([DestinoViajeEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule
  ],
  providers: [
    DestinosApiClient,
    AuthService,
    UsuarioLogueadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
