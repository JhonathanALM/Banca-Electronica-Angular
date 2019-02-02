import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { map, catchError, tap } from 'rxjs/operators';
import{CuentaService} from './cuenta.service';
import { from } from 'rxjs';
//import {Movimiento  } from '../domain/productoCuentaRQ';

const endpointUsuarioKYC = '/KYC-mongo-rest-web/api/cliente/cedula/';


@Injectable({
    providedIn: 'root'

})

export class MovimientoService {
    public url: string;
    constructor(private _http: Http,
        private http1: HttpClient) {
        this.url = "/Modulo-Cuentas-Pll-web/api/transaccion";

    }
    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
    getMovimientosAll(fechaInicial, fechaFinal, cuenta) {
        return this._http.get(this.url + "/" + fechaInicial + '&' + fechaFinal + '&' + cuenta).map(res => res.json());
    }

    getUnUsuario(user: string): Observable<any> {
        return this.http1.get(endpointUsuarioKYC + user).pipe(map(this.extractData));
    }

}


/*import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//import {Movimiento  } from '../domain/productoCuentaRQ';

@Injectable()
export class MovimientoService {
public url: string;
constructor(private _http: Http) {
    this.url = "/Modulo-Cuentas-Pll-web/api/transaccion";
}
getMovimientosAll( fechaInicial, fechaFinal, cuenta ) {
    return this._http.get(this.url + "/"+fechaInicial+ '&'+fechaFinal+'&'+cuenta).map(res => res.json());
}

} */