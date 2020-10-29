import {Component, Inject, Injectable, InjectionToken, OnInit} from '@angular/core';
import {DestinosApiClient} from "../../models/DestinosApiClient.model";
import {DestinoViaje} from "../../models/DestinoViaje.model";
import {ActivatedRoute} from "@angular/router";
import {AppState} from "../../app.module";
import {Store} from "@ngrx/store";

class DestinoApiClientViejo {
  getById(id):DestinoViaje {
    console.log('Log por la clase api client vieja' + id)
    return null;
  }
}

interface AppConfig {
  apiEndpoint:string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config')

@Injectable()
class DestinoApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }

  getById(id) {
    console.log('Lammada desde clase decorada');
    console.log('config: ' + this.config.apiEndpoint)
    return super.getById(id);
  }

}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: DestinosApiClient, useClass: DestinoApiClientDecorated },
    { provide: DestinoApiClientViejo, useExisting: DestinosApiClient }
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino:DestinoViaje;

  constructor(private route: ActivatedRoute, private destinoApiClientViejo:DestinoApiClientViejo) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.destino = this.destinoApiClientViejo.getById(id)
  }

}
