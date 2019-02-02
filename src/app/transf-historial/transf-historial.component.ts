import { Component, OnInit, PipeTransform } from '@angular/core';
import { HistorialService } from '../Services/service/historial.service';
import { Historial } from '../Services/domain/historial';
import { CuentasService } from 'src/app/Services/service/cuentas.service';
import { Cuenta } from 'src/app/Services/domain/cuenta';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { LoginService } from './../services/service/login.service';

@Component({
  selector: 'app-transf-historial',
  templateUrl: './transf-historial.component.html',
  styleUrls: ['./transf-historial.component.css'],
  providers: [FormatoFechaPipe]
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


  constructor(private historialService: HistorialService, private cuentasService: CuentasService, private formatoFechaPipe: FormatoFechaPipe, private auth: LoginService) { }

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
    /* this.numCuenta = this.cuentaSeleccionada.cuenta;
    
    let nc = this.numCuenta; */
    console.log(fi);
    console.log(ff);
    /* console.log(nc); */
    this.historialService.getHistorialTransferencias(fi, ff, this.cuentaSeleccionada.cuenta).subscribe((data) => {
      console.log("historial", data);
      this.transferencias = data;
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