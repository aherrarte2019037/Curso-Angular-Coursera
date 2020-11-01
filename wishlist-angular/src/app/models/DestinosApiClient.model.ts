import {DestinoViaje} from './DestinoViaje.model';
import {APP_CONFIG, AppConfig, AppState, db} from "../app.module";
import {Store} from "@ngrx/store";
import {DeleteAction, FavoritoDestinoAction, NuevoDestinoAction} from "./DestinoViajeState.model";
import {forwardRef, Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";

@Injectable()
export class DestinosApiClient {
  destinos:DestinoViaje[] = [];
  headers:HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});

  constructor(private store:Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config:AppConfig, private http: HttpClient) {
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        this. destinos = data.items;
      });
    this.store
      .subscribe(() => {
      });
  }

  add(destino:DestinoViaje){
    const request = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nombre: destino.nombre, descripcion: destino.descripcion, url: destino.url}, { headers: this.headers})
    this.http.request(request).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(destino));
        db.destinos.add(destino);
      }
    });

  }


  delete(indice:number){
    const request = new HttpRequest('DELETE', `${this.config.apiEndpoint}/delete/${indice}`, {headers: this.headers})
    this.http.request(request).subscribe(() => {
        this.store.dispatch(new DeleteAction(indice));
      }
    );

  }

  elegir(destino:DestinoViaje){
    this.store.dispatch(new FavoritoDestinoAction(destino))
  }

  // noinspection JSUnusedLocalSymbols
  getById(id) {
    return 1
  }
}
