import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

 import { map, catchError, tap } from 'rxjs/operators';

 //const endpointHistorial = '/Modulo-Cuentas-Pll-web/api/transaccion/HisTransfer/01-12-2018&03-01-2019&100123';
const endpointHistorial = '/Modulo-Cuentas-Pll-web/api/transaccion/HisTransfer/';

 @Injectable({
  providedIn: 'root'
})
export class HistorialService {

   constructor(private http: HttpClient) { }

   private extractData(res: Response) {
    let body = res;
    return body || {};
  }

   getHistorialTransferencias(finicio:String, ffin:String,ncuenta:String): Observable<any> {
    console.log("buscando historial...")
    return this.http.get(endpointHistorial+finicio+"&"+ffin+"&"+ncuenta).pipe(
      map(this.extractData));
  }
}