import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';
import { Prestamo } from '../Services/domain/prestamo';
import { LoginService } from './../services/service/login.service';



@Component({
  selector: 'app-prestamos-soli',
  templateUrl: './prestamos-soli.component.html',
  styleUrls: ['./prestamos-soli.component.css']
})
export class PrestamosSoliComponent implements OnInit {

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
  curretUser:any;

  constructor(private cuentasService: CuentasService, private auth:LoginService) { }

  ngOnInit() {
    this.curretUser = this.auth.getCurrentUser();
    this.obtenerListaCuentas();
    this.obtenerListaPrestamos();
    this.obtenerUnUsuario();
    this.cols = [
      { field: 'cuenta', header: 'Cuenta' },
      { field: 'estado', header: 'Estado' },
      { field: 'saldo', header: 'Saldo' },
      { field: 'tipo', header: 'Tipo' }
    ];
    this.cols2 = [
      { field: 'numero', header: 'Número' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' },
      { field: 'monto', header: 'Monto' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'saldo', header: 'Saldo' }
    ];
    
  }


  obtenerListaCuentas() {
    
    this.cuentasService.getListaCuentas("100445689").subscribe((data) => {
      console.log("lista Cuentas",data);
      this.cuentas1 = data;
    });
  }
  
  obtenerListaPrestamos() {
    
    this.cuentasService.getListaPrestamos("100445689").subscribe((data) => {
      console.log("lista Prestamos",data);
      this.prestamos1 = data;
    });
  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario(this.curretUser).subscribe((data) => {
      console.log("usr",data);
      this.identificadorUsuario = [];
      
      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }

  updateInfo(){
    console.log("click");
    this.obtenerListaCuentas();
    this.obtenerListaPrestamos();
  }

}
