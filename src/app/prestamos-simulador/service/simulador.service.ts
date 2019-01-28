import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, tap } from 'rxjs/operators';
import { Simulador } from '../domain/simulador';



@Injectable({
  providedIn: 'root'
})
export class SimuladorService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getTabla(monto: number, interes: number, tiempo: number) {
    return [];
  }
}

