import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';
import { Movimiento } from '../Services/domain/moviento';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { MovimientoService } from '../Services/Service/movimiento.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
  providers: [FormatoFechaPipe, MessageService]

})
export class MovimientoComponent implements OnInit {

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
  desde: any = "";
  hasta: any = "";
  movimientos: Movimiento[];
  movimientoSeleccionada: Movimiento;

  constructor(private movimientoService: MovimientoService, private cuentasService: CuentasService, private formatoFechaPipe: FormatoFechaPipe, private messageService: MessageService) { }

  ngOnInit() {
    this.obtenerListaCuentas();
    this.obtenerUnUsuario();
    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'valor', header: 'Valor' },
      { field: 'saldo', header: 'Saldo' }

    ];

  }

  btnAceptar() {
    console.log("DESDE=:>", this.desde);
    console.log("HASTA=:>", this.hasta);
    console.log("CUENTA=:>", this.cuentaSeleccionada.cuenta);
    this.obtenerMovimiento();
  }
  obtenerListaCuentas() {
    this.cuentasService.getListaCuentas("1004456891").subscribe((data) => {
      console.log("lista Cuentas", data);
      this.cuentas1 = data;
      this.cuentaSeleccionada = this.cuentas1[0];
    });
  }

  obtenerMovimiento() {
    let fi = this.formatoFechaPipe.transform(this.desde.toDateString());

    let ff = this.formatoFechaPipe.transform(this.hasta.toDateString());

    console.log("FI=:>", fi);
    console.log("FF=:>", ff);
    this.movimientos = [];
    this.movimientoService.getMovimientosHistorial(fi, ff, this.cuentaSeleccionada.cuenta).subscribe((data) => {
      console.log("HISTORIAL DE MOVIMIENTOS", data);
      this.movimientos = data;
      if (this.movimientos.length == undefined) {
        this.messageService.add({ severity: 'warn', summary: 'Sin registros', detail: 'Verifique la fecha ingresada' });
      } else {
        this.messageService.add({ severity: 'info', summary: 'Registros Encontrados', detail: 'tiene: ' + this.movimientos.length });
      }
    });
  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario("1004456891").subscribe((data) => {
      console.log("usr", data);
      this.identificadorUsuario = [];

      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }

  updateInfo() {
    console.log("click");
    this.obtenerListaCuentas();
    // this.obtenerListaPrestamos();
  }

}
