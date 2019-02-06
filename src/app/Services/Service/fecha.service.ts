import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//import {Movimiento  } from '../domain/productoCuentaRQ';

@Injectable({
    providedIn: 'root'
}
    
)
export class FechaService {
    public url: string;
    constructor(private _http: Http) {
        this.url = "/Seguridades/api/fecha/";
    }
    getFecha() {
        return this._http.get(this.url).map(res => res.json());
        console.log('tEST') ;
    }

    

      

    }