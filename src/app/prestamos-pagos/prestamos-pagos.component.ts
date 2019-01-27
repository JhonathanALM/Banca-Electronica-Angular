import { Component, OnInit } from '@angular/core';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { PagosService } from './service/pagos.service';
import { ReqPago } from './domain/reqpago';
import { Pago } from './domain/pago';



@Component({
  selector: 'app-prestamos-pagos',
  templateUrl: './prestamos-pagos.component.html',
  styleUrls: ['./prestamos-pagos.component.css'],
  providers: [FormatoFechaPipe]
})
export class PrestamosPagosComponent implements OnInit {

  pagos: Pago[];
  unPago: Pago;

  montoTotal: Number = 10000.0;
  valorPagar: String;
  permitePago: boolean = false;
  display: boolean = false;

  requestPago: ReqPago;

  constructor( private pagosService: PagosService) { }

  ngOnInit() {
    this.obtenerInfoPago();

  }

  obtenerInfoPago() {
    
    this.pagosService.getPagos().then(pagos => {
      this.pagos = pagos;
      this.unPago = this.pagos[0];
      this.estadoPago();
    });
  }
  estadoPago() {
    var valorPago = Number(this.valorPagar);
    this.permitePago = (valorPago <= this.unPago.valorCuota) ? true : false;
  }

  mostrarDetallePago(event: Event, pago: Pago) {
    this.unPago = pago;
    this.display = true;
    event.preventDefault();
  }

  realizarPago() {
    this.display = false;
    this.requestPago = {
      id: this.unPago.numCuota,
      valorPagado: Number(this.valorPagar)
    }
    console.log("realizando pago... ", this.requestPago);
    //this.pagosService.sendPrestamo(this.requestPago);
    this.obtenerInfoPago();
  }

  toNumber(_valor){
    return parseFloat(_valor).toFixed(2);
  }

}
