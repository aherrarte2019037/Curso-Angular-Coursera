import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/DestinoViaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  destinos: DestinoViaje[];

  constructor() {
    this.destinos = [];
  }

  ngOnInit(): void {
  }


  guardarDatos(nombre:string, url:string, descripcion:string):boolean{
    this.destinos.push(new DestinoViaje(nombre, url, descripcion));

    return false;
  }


}
