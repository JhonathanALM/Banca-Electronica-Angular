import { LoginService } from './../services/service/login.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/primeng';
import { CuentaService } from './service/cuenta.service';
import { Usuario } from './domain/usuario';
import { Cuenta } from './domain/cuenta';
import { MovimientoService } from './service/movimiento.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, formatDate } from '@angular/common';

/*JONA LO QUE ESTÁ COMENTADO ES LO QUE DEBERÍA IR CEDULA Y LA CUENTA, NO SE COMO ESTAN MANEJANDO LO DEL USUARIO PERO LO DEMAS FUNCIONA
AHORITA VA QUEMADO LA CEDULA Y LA CUENTA
CEDULA:1234567890
CUENTA:100123  */




@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientoComponent implements OnInit {

  //Listas
  cuentas: Cuenta[];
  cuenta: SelectItem[];
  

  cuenta_ser: any;
  cuenta_sel: any;
  movimientos: any;
  fecha1: any;
  fecha2: any;
  cols: any[];
  unUsuario: Usuario;
  curretUser: any;

  identificadorUsuario: MenuItem[];
  headers = new HttpHeaders;
  cedula: Usuario

  constructor(
    public movimientoService: MovimientoService,
    public _cuentaService: CuentaService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private auth: LoginService,
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
    //this._cuentaService.getCuentasAll(this.cedula).subscribe(
    this._cuentaService.getCuentasAll("cedula").subscribe(
      data => {
        this.cuentas = data;
        this.cuenta = [];
        this.cuenta.push({ label: 'Seleccione la cuenta', value: null });
        for (let key of this.cuentas) {
          this.cuenta.push({ label: key.cuenta, value: key.cuenta });
        }
      },
      err => {
        console.log("Error.");
      });

    console.log('Test2');
    let movimientos1 = this.http.get('http://40.87.45.204:8080/Modulo-Cuentas-Pll-web/api/cuenta/' + this.curretUser, { headers: this.headers });
    // let movimientos1 = this.http.get('http://40.87.45.204:8080/Modulo-Cuentas-Pll-web/api/cuenta/1234567890', { headers: this.headers });
    console.log(this.cedula);

    movimientos1.subscribe((response) => {
      //console.log(response);
      // console.log(response);
      this.cuenta_ser = <any>response;
    }
    );

  }
  btnAceptar() {

    //La fecha se captura desde el calendario como mes-dia-año
    //Y se manda como parametro día-mes-año

    this.movimientoService.getMovimientosAll(this.fecha1.getDate() + '-' + (this.fecha1.getMonth() + 1) + '-' + this.fecha1.getFullYear(), this.fecha2.getDate() + '-' + (this.fecha2.getMonth() + 1) + '-' + this.fecha2.getFullYear(), this.cuenta_ser).subscribe(
      //this.movimientoService.getMovimientosAll(this.fecha1.getDate() + '-' + (this.fecha1.getMonth() + 1) + '-' + this.fecha1.getFullYear(), this.fecha2.getDate() + '-' + (this.fecha2.getMonth() + 1) + '-' + this.fecha2.getFullYear(), "100123").subscribe(

      data => {

        console.log("cuentaser", this.cuenta_ser)

        console.log(this.fecha1);
        console.log(this.fecha1.getDate() + '-' + (this.fecha1.getMonth() + 1) + '-' + this.fecha1.getFullYear());
        console.log(this.fecha2);
        console.log(this.fecha2.getDate() + '-' + (this.fecha2.getMonth() + 1) + '-' + this.fecha2.getFullYear());

        this.movimientos = data;


      },
      err => {
        console.log("Error cuenta");
        console.log("cuentaser", this.cuenta_ser)



      }
    );
  }

  cargarCuentas() {
    this._cuentaService.getCuentasAll(this.cedula).subscribe(
      //this._cuentaService.getCuentasAll("1234567890").subscribe(
      data => {
        this.movimientos = data;
        console.log(this.cedula);
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
