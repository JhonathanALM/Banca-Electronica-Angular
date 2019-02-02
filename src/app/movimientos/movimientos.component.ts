import { Component, OnInit, PipeTransform } from '@angular/core';
import { LoginService } from './../services/service/login.service';
//import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/primeng';
import { CuentaService } from '../Services/Service/cuenta.service';
import { CuentasService } from 'src/app/Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from 'src/app/Services/domain/cuenta';
import { MovimientoService } from '../Services/Service/movimiento.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, formatDate } from '@angular/common';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { Movimiento } from '../Services/domain/moviento';

/*JONA LO QUE ESTÁ COMENTADO ES LO QUE DEBERÍA IR CEDULA Y LA CUENTA, NO SE COMO ESTAN MANEJANDO LO DEL USUARIO PERO LO DEMAS FUNCIONA
AHORITA VA QUEMADO LA CEDULA Y LA CUENTA
CEDULA:1234567890
CUENTA:100123  */

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
  providers: [FormatoFechaPipe]

})
export class MovimientoComponent implements OnInit {

  //Listas
  cuentas: Cuenta[];
  cuenta: SelectItem[];
  cuentaSeleccionada: Cuenta;
  cuenta_ser: any;
  cuenta_sel: any;
  movimientos: any;
  movimientoSeleccionado: Movimiento;
  fecha1: any;
  fecha2: any;
  cols: any[];
  unUsuario: Usuario;
  curretUser: any;

  identificadorUsuario: MenuItem[];
  headers = new HttpHeaders;
  cedula: Usuario


  fechaHasta: Date;
  fechaDesde: Date;


  //nCedula:String;
  nCedulaKYC: String;

  constructor(
    public movimientoService: MovimientoService,
    public _cuentaService: CuentaService,
    private http: HttpClient,
    private auth: LoginService,
    private formatoFechaPipe: FormatoFechaPipe
  ) {
    this.headers.append('Content-Type', 'applicaion/json');
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }


  ngOnInit() {
    this.curretUser = this.auth.getCurrentUser();
    console.log("curr2:::", this.curretUser);
    this.obtenerUnUsuario();

    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'valor', header: 'Valor' },
      { field: 'saldo', header: 'Saldo' }
    ];

    this.cuenta = [];
    this.cuenta.push({ label: 'Seleccione la cuenta', value: null });
    this._cuentaService.getCuentasAll(this.curretUser).subscribe(
      (data) => {
        this.cuentas = data;
        this.cuenta = [];
        this.cuenta.push({ label: 'Seleccione la cuenta', value: null });
        for (let key of this.cuentas) {
          this.cuenta.push({ label: key.cuenta, value: key.cuenta });
        }
        this.cuentaSeleccionada = this.cuentas[0];
        console.log(this.cuentaSeleccionada.cuenta)

      },
      err => {
        console.log("Error.");
      });

    console.log('Test2');
    let movimientos = this.http.get('http://40.87.45.204:8080/Modulo-Cuentas-Pll-web/api/cuenta/' + this.curretUser, { headers: this.headers });
    console.log(this.cedula);
    movimientos.subscribe((response) => {
      console.log(response);
      console.log(response);
      this.cuenta_ser = <any>response;
    }
    );

  }

  btnAceptar() {

    //La fecha se captura desde el calendario como mes-dia-año
    //Y se manda como parametro día-mes-año
    let fi = this.formatoFechaPipe.transform(this.fechaDesde.toDateString());
    let ff = this.formatoFechaPipe.transform(this.fechaHasta.toDateString());

    this.movimientoService.getMovimientosAll(fi, ff, this.cuentaSeleccionada.cuenta).subscribe((data) => {

      console.log("cuenta", this.cuentaSeleccionada.cuenta)
      this.movimientos = data;

      console.log(data);
    },
      err => {
        console.log("Error cuenta");
        console.log("cuentaser", this.cuentaSeleccionada.cuenta)



      }
    );
  }

  cargarCuentas() {
    this._cuentaService.getCuentasAll(this.curretUser).subscribe(
      //this._cuentaService.getCuentasAll("1234567890").subscribe(
      data => {
        this.movimientos = data;
        console.log(this.curretUser);
      },
      err => {
        console.log("Error");
      }
    );
  }

  obtenerUnUsuario() {
    this.movimientoService.getUnUsuario(this.curretUser).subscribe((data) => {
      console.log("usr", data);
      this.identificadorUsuario = [];
      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }


}
