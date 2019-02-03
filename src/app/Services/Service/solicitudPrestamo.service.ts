import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { map, catchError, tap } from 'rxjs/operators';

const endponitMovimiento = '/Modulo-Cuentas-Pll-web/api/transaccion/';
const endponitSolPrestamo = '/Prestamo-web/api/nuevoPrestamo';
const endpointSoliPrestamo = '/Prestamo-web/api/nuevoPrestamo/';
@Injectable({
    providedIn: 'root'
})
export class SolicitudPrestamoService {

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getTiposPrestamos() {
        return this.http.get(endponitSolPrestamo).pipe(
            map(this.extractData));
    }

    getInformacionPrestamos(tipoPrestamo: String) {
        return this.http.get(endpointSoliPrestamo + tipoPrestamo).pipe(
            map(this.extractData));
    }
}