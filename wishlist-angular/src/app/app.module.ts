import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule as NgRxStoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from './main/app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/DestinosApiClient.model';
import {
  DestinoViajeEffects,
  DestinoViajeState,
  intializeDestinoViajeState,
  reducerDestinoViajes
} from "./models/DestinoViajeState.model";
import {ActionReducerMap} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

const routes: Routes= [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino', component: DestinoDetalleComponent }
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
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
