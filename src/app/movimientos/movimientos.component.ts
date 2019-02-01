import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  //Listas
  cuentas1: Cuenta[];
//  prestamos1: Prestamo[];

  //distribución
  cols: any[];
 // cols2: any[];

  cuentaSeleccionada: Cuenta;
 // prestamoSeleccionado: Cuenta;

  unUsuario: Usuario;
  identificadorUsuario: MenuItem[];

  constructor(private cuentasService: CuentasService) { }

  ngOnInit() {
    this.obtenerListaCuentas();
    this.obtenerUnUsuario();
    this.cols = [
      { field: 'cuenta', header: 'Cuenta' },
      { field: 'estado', header: 'Estado' },
      { field: 'saldo', header: 'Saldo' },
      { field: 'tipo', header: 'Tipo' }
    ];

  }


  obtenerListaCuentas() {
    
    this.cuentasService.getListaCuentas("1004456891").subscribe((data) => {
      console.log("lista Cuentas",data);
      this.cuentas1 = data;
    });
  }


  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario("1004456891").subscribe((data) => {
      console.log("usr",data);
      this.identificadorUsuario = [];
      
      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }

  updateInfo(){
    console.log("click");
    this.obtenerListaCuentas();
   // this.obtenerListaPrestamos();
  }

}
