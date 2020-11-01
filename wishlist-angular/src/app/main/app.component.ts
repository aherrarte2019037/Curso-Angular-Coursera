import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeHome: string = 'active';
  activeDestino: string = '';
  lang:string = '';
  DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];

  constructor(public translate:TranslateService) {
    translate.setDefaultLang('es');
  }

  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().getHours() + ':' + this.agregarCeros(new Date().getMinutes().toString()) + ':' + this.agregarCeros(new Date().getSeconds().toString()) + this.agregarSiglas()), 10);
  });

  date = new Observable(observer => {
    setInterval(() => observer.next(this.DIAS[new Date().getDay()] + ' ' + new Date().getDate() + ', ' + this.MESES[new Date().getMonth()]), 10);
  });

  activarHome() {
    this.activeHome = 'active';
    this.activeDestino = '';
  }

  activarDestino() {
    this.activeHome = '';
    this.activeDestino = 'active';
  }

  agregarSiglas():string{
    if(new Date().getHours() < 12){
      return ' AM'
    }else{
      return ' PM'
    }
      return ''
  }

  agregarCeros(cadena:string):string {
    let cadenaFinal: string;
   return cadenaFinal = cadena.length === 1 ? '0'+cadena : cadena;
  }

}
