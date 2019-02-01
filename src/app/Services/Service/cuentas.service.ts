import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Message } from 'primeng/components/common/api';

import { map, catchError, tap } from 'rxjs/operators';

const endpointCuentas = '/Modulo-Cuentas-Pll-web/api/cuenta/';
const endpointPrestamos = '/Prestamo-web/api/verPrestamo/1';
const endpointUsuarioKYC = '/KYC-mongo-rest-web/api/cliente/cedula/';
const endpointObtTransfe = '/Modulo-Cuentas-Pll-web/api/transferencia/directa/';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  msgs: Message[] = [];

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUnUsuario(user:string): Observable<any> {
    return this.http.get(endpointUsuarioKYC + user).pipe(
      map(this.extractData));
  }

  getListaCuentas(user:string): Observable<any> {
    console.log(endpointCuentas + user);
    return this.http.get(endpointCuentas + user).pipe(
      map(this.extractData));
  }

  getListaPrestamos(user:string): Observable<any> {
    return this.http.get(endpointPrestamos).pipe(
      map(this.extractData));
  }
  getTransferencia(origen: String, destino: String, monto: String) {

    return this.http.get(endpointObtTransfe + origen + "&" + destino + "&" + monto, { observe: 'response' }).pipe(
      tap(
        resp => {
          console.log("CORRECTITO", resp.headers.get('ReturnStatus'));
        }, err => {
          console.log("ERRORSITO", err);
        }
      )
    );

  }
  getObtCuentas(user:string): Observable<any> {
    return this.http.get(endpointCuentas + user).pipe(
      map(this.extractData));
  }

}
