import { Usuario } from './../../transf-activacion/domain/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { map, catchError, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

const endpointLogin = '/user/';

@Injectable({
  providedIn: 'root'
})
//estoy adentrook

export class LoginService {

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getListaCuentas(user:String) : Observable<any[]> {
    const url=endpointLogin+user;
    console.log(url);
    return this.http.get<any>(url);    
  }

  setUser(Usuario): void {
    let user_string = JSON.stringify(Usuario);
    localStorage.setItem("currentUser", user_string);
  }
  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }
  getToken() {
    return localStorage.getItem("accessToken");
  }
  getCurrentUser(){
    console.log('Estoy aqui...');
    let user_string = localStorage.getItem("currentUser");   
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(["/"]);
  }
}