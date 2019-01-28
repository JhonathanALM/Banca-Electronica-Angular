import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from '../../login/service/login.service';
import { Message } from 'primeng/components/common/api';
import { map, catchError, tap } from 'rxjs/operators';

const endpointCuentas = '/ServicioCuenta/api/cuenta';
const endpointPrestamos = '/ServicioPrestamo/api/prestamo';
const endpointUsuarioKYC = '/KYC-mongo-rest-web/api/cliente/cedula/';
const endpointObtTransfe = '/Modulo-Cuentas-Pll-web/api/transferencia/directa/';
const endpointObtCuentas = 'Modulo-Cuentas-Pll-web/api/cuenta/';


@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  msgs: Message[] = [];

  constructor(private http: HttpClient, private p: LoginService) { }
  user = this.p.getCurrentUser();

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUnUsuario(): Observable<any> {
    return this.http.get(endpointUsuarioKYC + this.user).pipe(
      map(this.extractData));
  }

  getListaCuentas(): Observable<any> {
    return this.http.get(endpointCuentas + this.user).pipe(
      map(this.extractData));
  }

  getListaPrestamos(): Observable<any> {
    return this.http.get(endpointPrestamos).pipe(
      map(this.extractData));
  }
  getObtCuentas(): Observable<any> {
    return this.http.get(endpointObtCuentas + this.user).pipe(
      map(this.extractData));
  }

 /* getTransferencia(origen: String, destino: String, monto: String) {
    return this.http.get(endpointObtTransfe + origen + "&" + destino + "&" + monto, { observe: 'response' }).pipe(
      tap(
        resp => {
          console.log("CORRECTITO", resp.headers.get('ReturnStatus'));
        }, err => {
          console.log("ERRORSITO", err);
        }
      )
    );
  }*/
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
}
