import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinoViaje } from '../models/DestinoViaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit{
  @Input() destino: DestinoViaje;
  @Input() indice: number;
  @HostBinding('attr.class') cssClass = 'col-md-6 col-lg-4 mb-3';

  constructor() {
  }

  ngOnInit(): void {
  }
}
