import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

import { Simulador } from '../Services/domain/simulador';
import { Usuario } from '../Services/domain/usuario';
import { CuentasService } from '../Services/service/cuentas.service';
import { LoginService } from './../services/service/login.service';


@Component({
  selector: 'app-prestamo-simu',
  templateUrl: './prestamo-simu.component.html',
  styleUrls: ['./prestamo-simu.component.css']
})
export class PrestamoSimuladorComponent implements OnInit {

  //Listas
  cuentas1: Simulador[];
  //distribución
  cols: any[];
  cols2: any[];

  //datosCapturados
  can: any = "";
  imp: any = "";
  per: any = "";

  unUsuario: Usuario;
  identificadorUsuario: MenuItem[];
  curretUser:any;
  constructor(private cuentasService: CuentasService, private auth:LoginService) { }

  ngOnInit() { 
    this.curretUser = this.auth.getCurrentUser();
    this.obtenerUnUsuario(); 
    this.cols2 = [
      { field: 'period', header: 'Periodo' },
      { field: 'pay', header: 'Cuota' },
      { field: 'amortizationInterest', header: 'Interes' },
      { field: 'amortizationCapital', header: 'Capital' },
      { field: 'remainingCapital', header: 'Saldo' }
    ];   
  }

  obtenerSimulador() {    
    this.cuentas1=this.getAmortization(this.can, this.per, this.imp);
  }

  updateInfo(){
    console.log("click");
    this.obtenerSimulador();
  }
  reset(){
    console.log("click2");
    this.cuentas1=[];
  }

  getAmortization(capital, periods, interest) {    
    var interest2=interest/1200;
    console.log("interes2->",interest2);
    interest=interest/100;
    var pay= capital * (interest2 * Math.pow(1 + interest2, periods)) / (Math.pow(interest2 + 1, periods) - 1);
    console.log("pay->",pay);
    console.log("capital->",capital);
    console.log("periods->",periods);
    console.log("interest->",interest);
    
    var amortizationTable = [];
    var updateAmortizationTable = function (capital, periods) {
      var amortizationInterest = capital * (interest / 12),
        amortizationCapital = pay - amortizationInterest;
  
      if (capital < pay) {
        pay = capital + amortizationInterest;
        amortizationCapital = pay - amortizationInterest;
        updateTable(pay, amortizationCapital);
        return;
      } else {
        updateTable(pay, amortizationCapital);
        updateAmortizationTable(capital - amortizationCapital, periods - 1);
      }
  
      function updateTable(pay, amortizationCapital) {
        amortizationTable.push({
          period: (amortizationTable.length + 1),
          pay:pay.toFixed(2),
          amortizationInterest: amortizationInterest.toFixed(2),
          amortizationCapital: amortizationCapital.toFixed(2),
          remainingCapital: Math.round((capital - amortizationCapital)*100)/100 
        });
      }
    };
    updateAmortizationTable(capital, periods);
    return amortizationTable;
  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario(this.curretUser).subscribe((data) => {
      console.log("usr",data);
      this.identificadorUsuario = [];
      
      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }
}



