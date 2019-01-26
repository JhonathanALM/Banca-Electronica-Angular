import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { CuentasService } from '../pos-consolidada/service/cuentas.service';
import { Usuario } from './domain/usuario';
import { Cuenta } from './domain/cuenta';
import { Prestamo } from './domain/prestamo';



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

  constructor(private cuentasService: CuentasService) { }

  ngOnInit() {
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
    
    this.cuentasService.getListaCuentas().subscribe((data) => {
      console.log("lista Cuentas",data);
      this.cuentas1 = data;
    });
  }
  
  obtenerListaPrestamos() {
    
    this.cuentasService.getListaPrestamos().subscribe((data) => {
      console.log("lista Prestamos",data);
      this.prestamos1 = data;
    });
  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario().subscribe((data) => {
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
