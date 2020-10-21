import {Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import { DestinoViaje } from '../models/DestinoViaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit{
  @Input() destino: DestinoViaje;
  @Input() indice: number;
  @HostBinding('attr.class') cssClass = 'col-11 col-md-6 col-lg-4 mb-3';
  @Output() clicked: EventEmitter<DestinoViaje>;
  @Output() eliminarDestino: EventEmitter<number>;


  constructor() {
    this.clicked = new EventEmitter();
    this.eliminarDestino = new EventEmitter();
  }

  ngOnInit(): void {
  }

  seleccionar() {
    this.clicked.emit(this.destino);
    return false;
  }

  setEliminarDestino(idEliminar:number) {
    this.eliminarDestino.emit(idEliminar)
  }
}
