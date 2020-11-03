import {Component, OnInit} from '@angular/core';
import {DestinosApiClient} from "../../models/DestinosApiClient.model";
import {DestinoViaje} from "../../models/DestinoViaje.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ DestinosApiClient ]
})
export class DestinoDetalleComponent implements OnInit {
  destino:DestinoViaje;
  style = {
    sources: {
      world: {
        type: 'geojson',
        data:
          'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
      },
    },
    version: 8,
    layers: [
      {
        id: 'countries',
        type: 'fill',
        source: 'world',
        layout: {},
        paint: {
          'fill-color': '#557ccb',
        },
      },
    ],
  };

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
  }

}
