import { Component, OnInit, PipeTransform } from '@angular/core';
import { HistorialService } from '../Services/service/historial.service';
import { Historial } from '../Services/domain/historial';
import { CuentasService } from 'src/app/Services/service/cuentas.service';
import { Cuenta } from 'src/app/Services/domain/cuenta';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { LoginService } from './../services/service/login.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-transf-historial',
  templateUrl: './transf-historial.component.html',
  styleUrls: ['./transf-historial.component.css'],
  providers: [FormatoFechaPipe, MessageService]
})
export class TransfHistorialComponent implements OnInit {

  transferencias: Historial[];
  cuentas: Cuenta[];

  transferenciaSeleccionada: Historial;
  cuentaSeleccionada: Cuenta;

  cols: any[];

  fechaHasta: Date;
  fechaDesde: Date;
  numCuenta: String;

  //nCedula:String;
  nCedulaKYC: String;
  curretUser: any;


  constructor(private historialService: HistorialService, private cuentasService: CuentasService, private formatoFechaPipe: FormatoFechaPipe, private auth: LoginService,private messageService: MessageService) { }

  ngOnInit() {
    this.curretUser = this.auth.getCurrentUser();
   this.nCedulaKYC = "1004456891";

    this.puedoBuscar();
    this.obtenerListaCuentas();
    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'cuentaDestino', header: 'Cuenta de Destino' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'concepto', header: 'Concepto' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'saldo', header: 'Saldo' },
      { field: 'valor', header: 'Valor' }
    ];

  }

  obtenerListaCuentas() {

    this.cuentasService.getListaCuentas(this.curretUser).subscribe((data) => {
      console.log("lista Cuentas", data);
      this.cuentas = data;
      this.cuentaSeleccionada = this.cuentas[0];
    });
  }
  obtenerHistorial() {

    let fi = this.formatoFechaPipe.transform(this.fechaDesde.toDateString());
    let ff = this.formatoFechaPipe.transform(this.fechaHasta.toDateString());
    console.log(fi);
    console.log(ff);
    this.transferencias=[];
    this.historialService.getHistorialTransferencias(fi, ff, this.cuentaSeleccionada.cuenta).subscribe((data) => {
      console.log("historial", data);      
      this.transferencias = data;
      console.log("tamaño", this.transferencias.length);
      if(this.transferencias.length==undefined){
        this.messageService.add({severity:'warn', summary: 'Sin registros', detail:'Verifique la fecha ingresada'});
      }else{
        this.messageService.add({severity:'info', summary: 'Registros Encontrados', detail:'tiene: '+this.transferencias.length});
      }
    });
  }

  puedoBuscar() {
    if (this.fechaDesde != null && this.fechaHasta != null) {
      console.log(false);
      return false;
    } else {
      console.log(true);
      return true;
    }
  }

}