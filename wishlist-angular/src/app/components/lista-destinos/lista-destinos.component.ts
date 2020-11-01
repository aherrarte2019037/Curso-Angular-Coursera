import {Component, EventEmitter, Output} from '@angular/core';
import {DestinoViaje} from '../../models/DestinoViaje.model';
import {DestinosApiClient} from '../../models/DestinosApiClient.model';
import {AppState} from "../../app.module";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinosComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  @Output() willFavorite: EventEmitter<boolean>;
  updates: string[];
  contadorHistorial: number = 0;
  willBeFavorite;
  all;

  constructor(public destinosApiClient: DestinosApiClient, private store: Store<AppState>, public translate:TranslateService) {
    translate.setDefaultLang('es');
    this.onItemAdded = new EventEmitter();
    this.willFavorite = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito).subscribe(favorito => {
      if (favorito !== null) {
        this.updates.push(favorito.nombre)
      }
    });
    this.store.select(state => state.destinos.items).subscribe(items => this.all = items)

  }

  agregado(destino: DestinoViaje) {
    this.destinosApiClient.add(destino);
    if(this.willBeFavorite === true){
      this.destinosApiClient.elegir(destino)
    }
  }

  elegido(destino: DestinoViaje) {
    this.destinosApiClient.elegir(destino);
  }

  setWillFavorite(favorite: boolean) {
    this.willBeFavorite = favorite;
  }

  willBeDelete(idEliminar: number) {
    this.destinosApiClient.delete(idEliminar)
  }

  eliminarUpdates() {
    this.updates = []
  }
}
