import { DestinoViaje } from './DestinoViaje.model';
import {BehaviorSubject, Subject} from "rxjs";

export class DestinosApiClient {
  destinos:DestinoViaje[];
  favorite:Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

  constructor() {
    this.destinos = [];
  }

  add(d:DestinoViaje){
    this.destinos.push(d);
  }

  delete(indice:number){
    this.destinos.splice(indice, 1)
  }

  getAll(){
    return this.destinos;
  }

  /*getById(id):DestinoViaje {
    return this.destinos.filter( function (destino) {return destino.id.toString () == id;})[0];
  }*/

  elegir(destino:DestinoViaje){
    this.destinos.forEach( d => d.setValue(false));
    destino.setValue(true);
    this.favorite.next(destino);
  }

  suscribeOnChange(fn) {
    this.favorite.subscribe(fn);
  }
}
