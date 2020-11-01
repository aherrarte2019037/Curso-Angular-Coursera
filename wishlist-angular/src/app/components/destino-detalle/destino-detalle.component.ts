import {Component, OnInit} from '@angular/core';
import {DestinosApiClient} from "../../models/DestinosApiClient.model";

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ DestinosApiClient ]
})
export class DestinoDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
