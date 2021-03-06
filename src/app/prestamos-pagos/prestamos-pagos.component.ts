import { Component, OnInit } from '@angular/core';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { PagosService } from '../Services/Service/pagos.service';
import { ReqPago } from '../Services/domain/reqpago';
import { Pago } from '../Services/domain/pago';
import { LoginService } from './../services/service/login.service';
import { SelectItem } from 'primeng/api';
import { CuentasService } from '../Services/Service/cuentas.service';
import { TransaccionRQ } from '../Services/domain/transaccionrq';


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
  curretUser:any;
    
  //Listado de cuentas
  cta_org: any = "";
  saldo: SelectItem[];
  cta_origen: any = [];

  transacccionRQ : TransaccionRQ;

  constructor( private pagosService: PagosService, 
    private auth:LoginService, 
    private cuentasService: CuentasService) { 
    this.saldo = [
      { label: 'cuenta', value: '12345' },
      { label: 'cuenta', value: '12345' },
      { label: 'cuenta', value: '12345' }
    ];
  }

  ngOnInit() {
    this.curretUser = this.auth.getCurrentUser();
    this.obtenerInfoPago();
    this.obtenerListaCuentas();
  }
  
  obtenerListaCuentas() {
    this.cuentasService.getObtCuentas(this.curretUser).subscribe((data) => {
      console.log(data);
      this.cta_origen = data;
      this.saldo.splice(this.cta_origen.length, this.saldo.length);
      for (let i = 0; i < this.cta_origen.length; i++) {
        //CUENTA DE ORIGEN
        this.saldo[i].label = this.cta_origen[i].cuenta;
        this.saldo[i].value = this.cta_origen[i].cuenta;
      }
    });
  }

  obtenerInfoPago() {
    
    this.pagosService.getUnPrestamo(this.curretUser).subscribe((data) => {
      this.pagos =[];      
      this.pagos.push(data);
      this.unPago = this.pagos[0];
      this.montoTotal = this.pagos[0].saldoRestante;
      this.estadoPago();
    });
  }
  estadoPago() {
    var valorPago = Number(this.valorPagar);
    this.permitePago = (valorPago <= this.unPago.saldoRestante) ? true : false;
  }

  mostrarDetallePago(event: Event, pago: Pago) {
    this.unPago = pago;
    this.display = true;
    event.preventDefault();
  }

  realizarPago(){
    this.requestPago = {
      id: this.unPago.numCuota,
      valorCuota: Number(this.valorPagar)
    }
    console.log("realizando pago... ", this.requestPago);
    this.pagosService.sendPrestamo(this.requestPago).subscribe((data)=>{
      console.log("pago realizado...",data);
      this.obtenerInfoPago();
      this.realizarUnaTransaccion();
      this.display = false;  
    }, error =>{
      console.log("ocurrio error",error);
      this.display = false;  
      this.realizarUnaTransaccion();
      this.obtenerInfoPago(); 
    });
    
  }
    
  realizarUnaTransaccion(){
    console.log("aqqq", this.cta_org)
    this.transacccionRQ = {
      cuenta: this.cta_org,
      monto: Number(this.valorPagar),
      tipo: 41
    }
    console.log("enviando ",this.transacccionRQ);
    this.pagosService.sendTransaccion(this.transacccionRQ).subscribe((data) => {
      console.log("Transacción Realizada Correctamente", data);
      
    });
  }

  toNumber(_valor){
    return parseFloat(_valor).toFixed(2);
  }

  toDate(_miString){
    let patron = "[UTC]";
    let nuevoValor    = "";
    return _miString.replace(patron, nuevoValor);
  }

}
