import { Component, OnInit } from '@angular/core';
import { ReqPago } from '../Services/domain/reqpago';
import { Pago } from '../Services/domain/pago';
import { LoginService } from '../Services/Service/login.service';
import { PagosService } from '../Services/Service/pagos.service';
import { FormatoFechaPipe } from '../util/formato-fecha.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css'],
  providers: [FormatoFechaPipe]
})
export class AmortizacionComponent implements OnInit {
  pagos: Pago[];
  unPago: Pago;
  cols: any[];
  montoTotal: Number = 10000.0;
  valorPagar: String;
  permitePago: boolean = false;
  display: boolean = false;
  cols2: any = [];
  requestPago: ReqPago;
  curretUser: any;
  montoUser: any = "";
  plazoUser: any = "";
  tipoPresUser: any = "";

  unUsuario: Usuario;
  identificadorUsuario: MenuItem[];
  userInfor: Informacion = {
    cedula: "",
    nombre: "",
    tipoPrestamo: "",
    monto: "",
    plazo: "",
    sDesgravamen: "",
    gAdminitstrativos: "",
    cntAtencion: "",
    tasainteres: ""
  }
  fnlUserInfor: Informacion[];

  cuentas1: Amortizacion[];
  fechTablaAmortizacion: any = [];
  int: any = "";
  valCuota: any = "";

  constructor(private pagosService: PagosService, private auth: LoginService, private route: ActivatedRoute, private router: Router, private cuentasService: CuentasService, private formatoFechaPipe: FormatoFechaPipe) {
    this.cols2 = [
      { field: 'nroCueota', header: 'Nro Cuota' },
      { field: 'fechaPago', header: 'fechaPago' },
      { field: 'amortizationCapital', header: 'Capital' },
      { field: 'amortizationInterest', header: 'Interes' },
      { field: 'valorCuota', header: 'Valor Cuota' },
      { field: 'remainingCapital', header: 'Saldo' },
      { field: 'estado', header: 'Estado' }
    ];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.montoUser = params.monto;
      this.plazoUser = params.plazo;
      this.tipoPresUser = params.tipoPrestamo;
    });
    let fecha = new Date();
    let dd = fecha.getDate();
    let mm = fecha.getMonth() + 1;
    let yyyy = fecha.getFullYear();
    console.log("dd", dd);
    console.log("mm", mm);
    console.log("yyyy", yyyy);
    if (mm > 12) {
      mm = 1;
      yyyy = yyyy + 1;
    }
    let fech = this.formatoFechaPipe.transform(fecha.toDateString());
    console.log("FECHITA=:>", fech);
    this.curretUser = this.auth.getCurrentUser();
    //this.obtenerInfoPago();
    this.obtenerUnUsuario();
    this.cuentas1 = this.getAmortization(this.montoUser, this.plazoUser, "16.06", dd, mm, yyyy);
    this.cols2 = [
      { field: 'period', header: 'Periodo' },
      { field: 'fecha', header: 'Fecha de Pago' },
      { field: 'pay', header: 'Valor de Cuota' },
      { field: 'amortizationInterest', header: 'Interes' },
      { field: 'amortizationCapital', header: 'Capital' },
      { field: 'remainingCapital', header: 'Saldo' }
    ];
  }

  obtenerInfoPago() {
    this.pagosService.getUnPrestamo(this.curretUser).subscribe((data) => {
      this.pagos = [];
      this.pagos.push(data);
      this.unPago = this.pagos[0];
      this.estadoPago();
    });
  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario(this.curretUser).subscribe((data) => {
      this.identificadorUsuario = [];
      this.unUsuario = data;
      this.pagos = [];
      this.fnlUserInfor = [];
      this.userInfor = {
        cedula: "",
        nombre: "",
        tipoPrestamo: "",
        monto: "",
        plazo: "",
        sDesgravamen: "",
        gAdminitstrativos: "",
        cntAtencion: "",
        tasainteres: ""
      }
      this.userInfor.cedula = this.unUsuario.identificacion;
      this.userInfor.nombre = this.unUsuario.nombres + this.unUsuario.apellidos;
      this.userInfor.monto = this.montoUser;
      this.userInfor.tipoPrestamo = this.tipoPresUser;
      this.userInfor.plazo = this.plazoUser;
      this.userInfor.sDesgravamen = "0.5%";
      this.userInfor.gAdminitstrativos = "0.5%";
      this.userInfor.cntAtencion = "0.5%";
      this.userInfor.tasainteres = "10.0";
      this.fnlUserInfor.push(this.userInfor);
    });
  }

  estadoPago() {
    var valorPago = Number(this.valorPagar);
    this.permitePago = (valorPago <= this.unPago.valorCuota) ? true : false;
  }

  mostrarDetallePago(event: Event, pago: Pago) {
    this.int = "16.06";
    var inte = this.int / 1200;
    this.valCuota = this.montoUser * (inte * Math.pow(1 + inte, this.plazoUser)) / (Math.pow(inte + 1, this.plazoUser) - 1);
    this.valCuota = this.valCuota.toFixed(2);
    this.unPago = pago;
    this.display = true;
    event.preventDefault();
  }

  btnRegresar(){
    this.router.navigate(["/template/solicitudp"]);
  }

  toNumber(_valor) {
    return parseFloat(_valor).toFixed(2);
  }

  toDate(_miString) {
    let patron = "[UTC]";
    let nuevoValor = "";
    return _miString.replace(patron, nuevoValor);
  }

  getAmortization(capital, periods, interest, dd, mm, yyyy) {
    var interest2 = interest / 1200;
    let nm = 0;
    interest = interest / 100;
    var pay = capital * (interest2 * Math.pow(1 + interest2, periods)) / (Math.pow(interest2 + 1, periods) - 1);
    var amortizationTable = [];
    var updateAmortizationTable = function (capital, periods) {
      var amortizationInterest = capital * (interest / 12),
        amortizationCapital = pay - amortizationInterest;
      nm = parseInt(mm);
      console.log("MES", nm);
      if (capital < pay) {
        if (nm > 12) {
          nm = 1;
          yyyy = yyyy + 1;
        }
        pay = capital + amortizationInterest;
        amortizationCapital = pay - amortizationInterest;
        updateTable(pay, amortizationCapital, dd, nm, yyyy);
        return;
      } else {
        if (nm > 12) {
          nm = 1;
          yyyy = yyyy + 1;
        }
        updateTable(pay, amortizationCapital, dd, nm, yyyy);
        updateAmortizationTable(capital - amortizationCapital, periods - 1);
      }
      function updateTable(pay, amortizationCapital, d, m, y) {
        var auxmm = (m + amortizationTable.length);
        if (((auxmm)/12)>=1) {
          y+=(auxmm/12)|0;
          auxmm = (auxmm%12)+1;
          
        }
        amortizationTable.push({
          period: (amortizationTable.length + 1),
          fecha: d + "-" + auxmm + "-" + y,
          pay: pay.toFixed(2),
          amortizationInterest: amortizationInterest.toFixed(2),
          amortizationCapital: amortizationCapital.toFixed(2),
          remainingCapital: Math.round((capital - amortizationCapital) * 100) / 100
        });
        if (nm > 12) {
          nm = 1;
          yyyy = yyyy + 1;
        }
        if (nm > 12) {
          nm = 1;
          yyyy = yyyy + 1;
        }
      }
    };
    updateAmortizationTable(capital, periods);
    console.log("AMORTIZACION TABLE INFORMACION", amortizationTable);
    return amortizationTable;
  }

}
export class Informacion {
  cedula: String;
  nombre: String;
  tipoPrestamo: String;
  monto: String;
  plazo: String;
  sDesgravamen: String;
  gAdminitstrativos: String;
  cntAtencion: String;
  tasainteres: String;
}

export class Amortizacion {
  period: String;
  valorCuota: String;
  interes: String;
  capital: String;
  saldo: String;
}
