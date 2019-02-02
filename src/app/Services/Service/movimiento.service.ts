import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { map, catchError, tap } from 'rxjs/operators';

const endponitMovimiento = '/Modulo-Cuentas-Pll-web/api/transaccion/';

@Injectable({
    providedIn: 'root'
})
export class MovimientoService {

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getMovimientosHistorial(finicio: String, ffin: String, numCuenta: String): Observable<any> {
        console.log("Buscando historial...");
        return this.http.get(endponitMovimiento + finicio + "&" + ffin + "&" + numCuenta).pipe(
            map(this.extractData));
    }
}