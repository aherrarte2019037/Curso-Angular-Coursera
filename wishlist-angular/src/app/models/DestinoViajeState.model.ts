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


export function initializeDestinoViajeState() {
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
  NO_ELEGIDO_FAVORITO = '[Destino Viaje] NoFavorito',
  VOTE_UP = '[Destino Viaje] Vote Up',
  VOTE_DOWN = '[Destino Viaje] Vote Down',
  DELETE = '[Destino Viaje] Delete',
  INIT_DATA = '[Destino Viaje] Init Data'
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
  constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
  type = DestinoViajeActionType.VOTE_UP;
  constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
  type = DestinoViajeActionType.VOTE_DOWN;
  constructor(public destino: DestinoViaje) {}
}

export class DeleteAction implements Action {
  type = DestinoViajeActionType.DELETE;
  constructor(public indice:number) {
  }
}

export class InitDataAction implements Action {
 type = DestinoViajeActionType.INIT_DATA;
 constructor(public destino: DestinoViaje[]) {}

}

export type DestinoViajeActions = NuevoDestinoAction | FavoritoDestinoAction | NoFavoritoDestinoAction | VoteUpAction | VoteDownAction | DeleteAction | InitDataAction;


/* Reducers */
export function reducerDestinoViajes(state: DestinoViajeState, action: DestinoViajeActions): DestinoViajeState {
  switch (action.type) {

    case DestinoViajeActionType.INIT_DATA: {
      return {
        ...state,
        items:(action as InitDataAction).destino.map((d) => new DestinoViaje(d.nombre, d.descripcion, d.url))
      }
    }

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
      return {
        ...state,
        items: [...state.items, (action as NuevoDestinoAction).destino]
      }
    }

    case DestinoViajeActionType.VOTE_UP: {
      (action as VoteUpAction).destino.voteUp()
      return {...state}
    }

    case DestinoViajeActionType.VOTE_DOWN: {
      (action as VoteUpAction).destino.voteDown()
      return {...state}
    }

    case DestinoViajeActionType.DELETE: {
      state.items.splice((action as DeleteAction).indice, 1)
      return {...state}
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
