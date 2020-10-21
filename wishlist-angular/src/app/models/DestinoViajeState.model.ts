import {DestinoViaje} from "./DestinoViaje.model";
import {Action} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

/* Estado */
export interface DestinoViajeState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje;
}


export function intializeDestinoViajeState() {
  return {
    items: [],
    loading: false,
    favorito: null
  };
}

/* Acciones */
export enum DestinoViajeActionType {
  NUEVO_DESTINO = '[Destino Viajes] Nuevo',
  ELEGIDO_FAVORITO = '[Destino Viaje] Favorito',
  NO_ELEGIDO_FAVORITO = '[Destino Viaje] NoFavorito'
}


export class NuevoDestinoAction implements Action {
  type = DestinoViajeActionType.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {}
}


export class FavoritoDestinoAction implements Action {
  type = DestinoViajeActionType.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje) {}
}

export class NoFavoritoDestinoAction implements Action{
  type = DestinoViajeActionType.NO_ELEGIDO_FAVORITO;
  constructor() {}
}


export type DestinoViajeActions = NuevoDestinoAction | FavoritoDestinoAction | NoFavoritoDestinoAction;


/* Reducers */
export function reducerDestinoViajes(state: DestinoViajeState, action: DestinoViajeActions): DestinoViajeState {
  switch (action.type) {
    case DestinoViajeActionType.NUEVO_DESTINO: {
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      }
    }

    case DestinoViajeActionType.ELEGIDO_FAVORITO: {
      state.items.forEach(destino => destino.setValue(false));
      const fav: DestinoViaje = (action as FavoritoDestinoAction).destino;
      fav.setValue(true);
      return {...state, favorito: fav}
    }

    case DestinoViajeActionType.NO_ELEGIDO_FAVORITO: {
    }
  }
  return state;

}


/* Effects */
@Injectable()
export class DestinoViajeEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
     ofType(DestinoViajeActionType.NUEVO_DESTINO),
    map((action: NuevoDestinoAction) => new FavoritoDestinoAction(action.destino))
  );

  constructor(private actions$: Actions) {}
}
