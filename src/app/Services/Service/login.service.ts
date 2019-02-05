import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

const endpointLogin = '/user/';


@Injectable({
  providedIn: 'root'
})
//estoy adentrook

export class LoginService {
  //  private currentSession: Session = null;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getListaCuentas(user: String): Observable<any[]> {
    const url = endpointLogin + user;
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
  getCurrentUser() {
    console.log('Consulto');
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      console.log("envie un usuario");
      return user;
    } else {
      console.log("no envie nada");
      return null;
    }
  }


  /*  isAuthenticated(): boolean {
      return (this.getCurrentToken() != null) ? true : false;
    };
    getCurrentToken(): string {
      var session = this.getCurrentSession();
      return (session && session.token) ? session.token : null;
    };
    getCurrentSession(): Session {
      return this.currentSession;
    }*/


  logoutUser() {
    let accessToken = localStorage.getItem('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(["/"]);
  }
}