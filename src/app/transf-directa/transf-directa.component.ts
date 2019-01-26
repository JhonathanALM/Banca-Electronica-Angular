import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { CuentasService } from '../transf-directa/service/cuentas.service';
import { Usuario } from './domain/usuario';
import { Cuenta } from './domain/cuenta';
import { Prestamo } from './domain/prestamo';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-transf-directa',
  templateUrl: './transf-directa.component.html',
  styleUrls: ['./transf-directa.component.css']
})
export class TransfDirectaComponent implements OnInit {

  //Listas
  cuentas1: Cuenta[];
  prestamos1: Prestamo[];

  //distribución
  cols: any[];
  cols2: any[];

  cta_origen: any = [];
  cta_destino: any = [];

  cuentaSeleccionada: Cuenta;
  prestamoSeleccionado: Cuenta;

  unUsuario: Usuario;
  identificadorUsuario: MenuItem[];

  saldo: SelectItem[];

  cta_org: any = "";
  cta_dest: any = "";
  monto: any = "";

  transfer: any = [];
  

  constructor(private cuentasService: CuentasService) { 
    this.saldo = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' },
    ];
  }

  ngOnInit() {
    this.obtenerListaCuentas();
    this.obtenerListaPrestamos();
    this.obtenerUnUsuario();       
  }


  obtenerListaCuentas() {
    this.cuentasService.getObtCuentas().subscribe((data) => {
      this.cta_origen = data;
      this.saldo.splice(this.cta_origen.length, this.saldo.length);
      for (let i = 0; i < this.cta_origen.length; i++) {
        //CUENTA DE ORIGEN
        this.saldo[i].label = this.cta_origen[i].cuenta;
        this.saldo[i].value = this.cta_origen[i].cuenta;
      }
    });
  }
  obtenerListaPrestamos() {

    this.cuentasService.getListaPrestamos().subscribe((data) => {
      console.log("lista Prestamos", data);
      this.prestamos1 = data;
    });
  }
  
  btnAceptar() {
    this.cuentasService.getTransferencia(this.cta_org, this.cta_dest, this.monto).subscribe((data)=>{
      console.log("DATA=:>",data);
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


}
