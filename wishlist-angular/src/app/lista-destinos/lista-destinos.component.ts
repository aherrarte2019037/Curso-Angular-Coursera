import {Component, EventEmitter, Output} from '@angular/core';
import {DestinoViaje} from '../models/DestinoViaje.model';
import {DestinosApiClient} from '../models/DestinosApiClient.model';
import {AppState} from "../app.module";
import {Store} from "@ngrx/store";
import {FavoritoDestinoAction, NoFavoritoDestinoAction, NuevoDestinoAction} from "../models/DestinoViajeState.model";

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  @Output() willFavorite: EventEmitter<boolean>;
  updates: string[];
  contadorHistorial: number = 0;
  willBeFavorite: boolean;

  constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito).subscribe(favorito => {
      if (favorito !== null) {
        this.updates.push(favorito.nombre)
      }
    });

  }

  agregado(destino: DestinoViaje) {
    this.destinosApiClient.add(destino);
    this.onItemAdded.emit(destino);
    switch (this.willBeFavorite) {
      case true: {
        this.store.dispatch(new NuevoDestinoAction(destino));
        break
      }
      case false: {
        this.store.dispatch(new NoFavoritoDestinoAction());
        break
      }

    }

  }

  elegido(destino: DestinoViaje) {
    this.destinosApiClient.elegir(destino);
    this.store.dispatch(new FavoritoDestinoAction(destino));
  }

  setWillFavorite(favorite: boolean) {
    this.willBeFavorite = favorite;
  }

  willBeDelete(idEliminar: number) {
    this.destinosApiClient.delete(idEliminar)
  }
}
