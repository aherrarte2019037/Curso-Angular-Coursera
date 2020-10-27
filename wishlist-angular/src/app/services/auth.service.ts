import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user:string, pass:string):boolean{
    if(user === 'user' && pass === 'pass'){
      localStorage.setItem('usuario', user)
      return true;
    }else {
      return false;
    }

  }

  logout() {
    localStorage.removeItem('usuario')
  }

  getUser() {
    return localStorage.getItem('usuario')
  }

  isLogged():boolean {
    return this.getUser() !== null
  }

}
