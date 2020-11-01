import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError:string = '';
  activarModal:string = '';
  mensajeModal:string = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(user, pass) {
    this.mensajeError = '';

    if(!user.value || !pass.value) {
      this.mensajeModal = 'Datos Incompletos';
      this.activarModal = '#modal'
    }else if(this.authService.login(user.value, pass.value)){
      this.mensajeError = 'Ingreso Exitoso'
      user.value = '';
      pass.value = '';
      this.mensajeModal = 'Ingreso Exitoso';
      this.activarModal = ''
      setTimeout(function () {
        this.mensajeError = '';
      }.bind(this), 2500);
    }else {
      this.mensajeModal = 'Usuario / Contraseña Incorrectos';
      this.activarModal = '#modal'
      this.mensajeError = 'Ingreso Fallido'
    }

    return false;
  }

  logout(){
    this.authService.logout();

    return false;
  }


}
