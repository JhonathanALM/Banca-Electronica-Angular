import { LoginService } from './../services/service/login.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';
import { Prestamo } from '../Services/domain/prestamo';



@Component({
  selector: 'app-pos-consolidada',
  templateUrl: './pos-consolidada.component.html',
  styleUrls: ['./pos-consolidada.component.css']
})
export class PosConsolidadaComponent implements OnInit {

  //Listas
  cuentas1: Cuenta[];
  prestamos1: Prestamo[];

  //distribución
  cols: any[];
  cols2: any[];

  cuentaSeleccionada: Cuenta;
  prestamoSeleccionado: Cuenta;

  unUsuario: Usuario;
  identificadorUsuario: MenuItem[];
  miArray = [];
  curretUser: any;
  constructor(private cuentasService: CuentasService, private auth: LoginService) { }
  ngOnInit() {
    this.curretUser = this.auth.getCurrentUser();
    console.log("curr::::", this.curretUser);
    this.obtenerListaCuentas();
    this.obtenerListaPrestamos();
    this.obtenerUnUsuario();

    this.cols = [
      { field: 'cuenta', header: 'Cuenta' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' },
      { field: 'saldo', header: 'Saldo' }

    ];
    this.cols2 = [
      { field: 'numero', header: 'Número' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'monto', header: 'Monto' },
      { field: 'saldo', header: 'Saldo' }
    ];

  }


  obtenerListaCuentas() {
    this.cuentasService.getListaCuentas(this.curretUser).subscribe((data) => {
      console.log("lista Cuentas", data);
      this.cuentas1 = data;
    });
  }

  obtenerListaPrestamos() {

    this.cuentasService.getListaPrestamos(this.curretUser).subscribe((data) => {
      console.log("Esta es la lista Prestamos", data);
      this.prestamos1 = [];
      this.prestamos1.push(data);
    });
  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario(this.curretUser).subscribe((data) => {
      console.log("usr", data);
      this.identificadorUsuario = [];
      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }

  updateInfo() {
    console.log("click");
    this.obtenerListaCuentas();
    this.obtenerListaPrestamos();
  }

  toDate(_miString) {
    let patron = "[UTC]";
    let nuevoValor = "";
    return _miString.replace(patron, nuevoValor);
  }
}
