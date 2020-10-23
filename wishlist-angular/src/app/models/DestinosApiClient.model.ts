import { DestinoViaje } from './DestinoViaje.model';
import {AppState} from "../app.module";
import {Store} from "@ngrx/store";
import {
  DeleteAction,
  FavoritoDestinoAction,
  NoFavoritoDestinoAction
} from "./DestinoViajeState.model";
import {Injectable} from "@angular/core";

@Injectable()
export class DestinosApiClient {

  constructor(private store: Store<AppState>) {}

  add(d:DestinoViaje){
    this.store.dispatch(new NoFavoritoDestinoAction(d))
  }


  delete(indice:number){
    this.store.dispatch(new DeleteAction(indice))
  }

  elegir(destino:DestinoViaje){
    this.store.dispatch(new FavoritoDestinoAction(destino))
  }

}
