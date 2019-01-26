import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { map, catchError, tap } from 'rxjs/operators';
import { LoginService } from '../../login/service/login.service';

const endpointCuentas = '/Modulo-Cuentas-Pll-web/api/cuenta/';
const endpointPrestamos = '/Prestamo-web/api/verPrestamo/1';
const endpointUsuarioKYC = '/KYC-mongo-rest-web/api/cliente/cedula/';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient, private p: LoginService) { }
  user = this.p.getCurrentUser();
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUnUsuario(): Observable<any> {
    console.log(endpointCuentas + this.user);
    return this.http.get(endpointUsuarioKYC + this.user).pipe(
      map(this.extractData));
  }

  getListaCuentas(): Observable<any> {
    console.log(endpointCuentas + this.user);
    return this.http.get(endpointCuentas + this.user).pipe(
      map(this.extractData));
  }

  getListaPrestamos(): Observable<any> {
    return this.http.get(endpointPrestamos).pipe(
      map(this.extractData));


  }

}
