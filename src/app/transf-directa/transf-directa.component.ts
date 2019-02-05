import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';
import { Prestamo } from '../Services/domain/prestamo';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { LoginService } from './../services/service/login.service';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';


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
  permiteTranferir: boolean = false;
  display: boolean = false;



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
        if(error.status==409){
          this.msgs = [];
          this.msgs.push({ severity: 'warn', summary: 'Transferencia no realizada', detail: ', Fondos Insuficientes' });  
        }else{
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Transferencia no realizada', detail: ', Verifique la información' });  
        }  
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
  estado() {
    var valor = Number(this.cta_dest);
    var valor2 = Number(this.monto);
    this.permiteTranferir=(valor<= this.cta_dest && valor2<= this.monto)?true:false;
  }
 
  mostrar(event: Event) {
    this.display = true;
    event.preventDefault();
  }
  


}
