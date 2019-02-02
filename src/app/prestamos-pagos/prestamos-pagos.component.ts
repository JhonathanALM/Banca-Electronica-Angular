import { Component, OnInit } from '@angular/core';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { PagosService } from '../Services/Service/pagos.service';
import { ReqPago } from '../Services/domain/reqpago';
import { Pago } from '../Services/domain/pago';
import { LoginService } from './../services/service/login.service';



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

  constructor( private pagosService: PagosService, private auth:LoginService) { }

  ngOnInit() {
    this.curretUser = this.auth.getCurrentUser();
    this.obtenerInfoPago();

  }

  obtenerInfoPago() {
    
    this.pagosService.getUnPrestamo(this.curretUser).subscribe((data) => {
      this.pagos =[];      
      this.pagos.push(data);
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

  realizarPago(){
    this.requestPago = {
      id: this.unPago.numCuota,
      valorPagado: Number(this.valorPagar)
    }
    console.log("realizando pago... ", this.requestPago);
    this.pagosService.sendPrestamo(this.requestPago).subscribe((data)=>{
      console.log("pago realizado...",data);
      this.obtenerInfoPago();  
      this.display = false;  
    }, error =>{
      console.log("ocurrio error",error);
      this.display = false;  
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
