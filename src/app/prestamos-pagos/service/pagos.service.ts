import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, tap } from 'rxjs/operators';
import { Pago } from '../domain/pago';
import { ReqPago } from '../domain/reqpago';

const endpointPrestamo = '/Prestamo-web/api/cuotaAmortizacion/'; 
const endpointPago = '/Prestamo-web/api/pago/'; 

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
      let body = res;
      return body || {};
    }
  
    getUnPrestamo(nCedula:String): Observable<any> {
      return this.http.get(endpointPrestamo+nCedula).pipe(
        map(this.extractData));
    }

    sendPrestamo(reqPago: ReqPago): Observable<any> {
      return this.http.put(endpointPago, reqPago,{
        observe: 'body',
        responseType: 'json'
          });
    }

    getPagos() {
      return this.http.get<any>('assets/prestamopagos/data/pagos.json')
                  .toPromise()
                  .then(res => <Pago[]> res.data)
                  .then(data => data);
  }
}
