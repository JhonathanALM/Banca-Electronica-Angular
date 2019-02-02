import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';
import { Prestamo } from '../Services/domain/prestamo';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { LoginService } from './../services/service/login.service';


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
  msgs: Message[] = [];

  sapo: any = true;
  curretUser:any;


  constructor(private cuentasService: CuentasService, private auth:LoginService) {
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
    this.curretUser = this.auth.getCurrentUser();
    this.obtenerListaCuentas();
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
    this.cuentasService.getObtCuentas(this.curretUser).subscribe((data) => {
      this.cta_origen = data;
      this.saldo.splice(this.cta_origen.length, this.saldo.length);
      for (let i = 0; i < this.cta_origen.length; i++) {
        //CUENTA DE ORIGEN
        this.saldo[i].label = this.cta_origen[i].cuenta;
        this.saldo[i].value = this.cta_origen[i].cuenta;
      }
    });
  }

  btnAceptar() {
    this.msgs = [];
    this.cuentasService.getTransferencia(this.cta_org, this.cta_dest, this.monto).subscribe((data) => {
      var aux = data.status;
      if (aux == 201) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Exito', detail: 'Transferencia realizada correctamente' });
        this.monto = null;
        this.cta_dest = null;
        this.cta_org = null;
        this.cta_origen = null;
      }
    },
      error => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Transferencia no realizada, verifique la información' });

      }
    );

  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario(this.curretUser).subscribe((data) => {
      console.log("usr", data);
      this.identificadorUsuario = [];
      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }


}
