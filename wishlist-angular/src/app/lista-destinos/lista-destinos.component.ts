import { Component} from '@angular/core';
import { DestinoViaje } from '../models/DestinoViaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent {
  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }


  guardarDatos(nombre, url, descripcion):boolean{
    //if(nombre.value === "" || url.value === "" || descripcion.value === ""){
    //}else{
      this.destinos.push(new DestinoViaje(this.upperFirst(nombre.value), this.upperFirst(url.value), this.upperFirst(descripcion.value)));
      this.limpiarFormulario(nombre, url, descripcion);
   // }

    return false;
  }

  elegido(destinoViaje: DestinoViaje){
    this.destinos.forEach( (d) => {
      d.setValue(false);
    })
    destinoViaje.setValue(true);
  }

  limpiarFormulario(campo1, campo2, campo3){
    campo1.value = "";
    campo2.value = "";
    campo3.value = "";
  }

  upperFirst = (text) => {
    if (typeof text !== 'string') return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

}
