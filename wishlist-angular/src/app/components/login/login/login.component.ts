import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError:string = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(user  : string, pass: string) {
    this.mensajeError = '';

    if(this.authService.login(user, pass)){
      this.mensajeError = 'Ingreso Exitoso'
      setTimeout(function () {
        this.mensajeError = '';
      }.bind(this), 2500);
    }else {
      this.mensajeError = 'Ingreso Fallido'
    }

    return false;
  }

  logout(){
    this.authService.logout();

    return false;
  }


}
