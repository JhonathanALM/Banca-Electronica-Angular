import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';
import { Movimiento } from '../Services/domain/movimiento';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { MovimientoService } from '../Services/Service/movimiento.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
  providers: [FormatoFechaPipe]
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
  desde: any = "";
  hasta: any = "";
  movimientos: Movimiento[];
  movimientoSeleccionada: Movimiento;

  constructor(private movimientoService: MovimientoService, private cuentasService: CuentasService, private formatoFechaPipe: FormatoFechaPipe) { }

  ngOnInit() {
    this.obtenerListaCuentas();
    this.obtenerUnUsuario();
    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'saldo', header: 'Saldo' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'valor', header: 'Valor' }
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

    this.movimientoService.getMovimientosHistorial(fi, ff, this.cuentaSeleccionada.cuenta).subscribe((data) => {
      console.log("HISTORIAL DE MOVIMIENTOS", data);
      this.movimientos = data;
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
