import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/primeng';

import { CuentasService } from '../Services/service/cuentas.service';
import { Usuario } from '../Services/domain/usuario';
import { Cuenta } from '../Services/domain/cuenta';
import { Prestamo } from '../Services/domain/prestamo';
import { LoginService } from './../services/service/login.service';
import { SoilicitudPrestamo } from '../Services/domain/solicitudPrestamo';
import { SolicitudPrestamoService } from '../Services/Service/solicitudPrestamo.service';

import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-prestamos-soli',
  templateUrl: './prestamos-soli.component.html',
  styleUrls: ['./prestamos-soli.component.css']
})
export class PrestamosSoliComponent implements OnInit {

  //Listas
  cuentas1: Cuenta[];
  prestamos1: Prestamo[];

  //distribución
  cols: any[];
  cols2: any[];

  cuentaSeleccionada: Cuenta;
  prestamoSeleccionado: Cuenta;

  unUsuario: Usuario;
  identificadorUsuario: MenuItem[];
  curretUser: any;

  //VARIABLES DEL FORMULARIO
  estado: any = "";
  descripcion: any = "";
  montoMin: any = "";
  montoMax: any = "";
  tasaInteres: any = "";
  plazoMin: any = "";
  plazoMax: any = "";
  tip_prestamo: any = "";
  tCliente: any = "";
  //LABEL's
  estadoL: any = "";
  descripcionL: any = "";
  montoMinL: any = "";
  montoMaxL: any = "";
  tasaInteresL: any = "";
  plazoMinL: any = "";
  plazoMaxL: any = "";
  tip_prestamoL: any = "";
  tClienteL: any = "";
  montoSol: any = "";
  plazoSol: any = "";

  tPrestamo: SelectItem[];
  inforPrestamo: any = [];


  constructor(private cuentasService: CuentasService, private solicitudPrestamo: SolicitudPrestamoService, private auth: LoginService, private route: ActivatedRoute, private router: Router) {
    this.tPrestamo = [
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
    this.obtenerListaPrestamos();
    this.obtenerTiposPrestamos();
    this.obtenerUnUsuario();
    console.log("tipoPrestamo=:>", this.tip_prestamo);
  }

  obtenerTiposPrestamos() {
    this.solicitudPrestamo.getTiposPrestamos().subscribe((data) => {
      this.tip_prestamo = data;
      console.log("DATICOS=:>", this.tip_prestamo);
      this.tPrestamo.splice(this.tip_prestamo.length, this.tPrestamo.length);
      console.log("TPrestamo=:>", this.tPrestamo);
      for (let index = 0; index < this.tip_prestamo.length; index++) {
        this.tPrestamo[index].label = this.tip_prestamo[index];
        this.tPrestamo[index].value = this.tip_prestamo[index];
      }
    });
  }

  obtenerInformacionPrestamo() {
        console.log("tipoPrestamo=:>", this.tip_prestamo);
        this.solicitudPrestamo.getInformacionPrestamos(this.tip_prestamo).subscribe((data) => {
          this.inforPrestamo = data;
          console.log("INFROS=:>", this.inforPrestamo);
          console.log("TAMA=:>", this.inforPrestamo.length);
          this.estadoL = this.inforPrestamo.estado;
          this.descripcionL = this.inforPrestamo.descripcion;
          this.montoMinL = this.inforPrestamo.montoMin;
          this.montoMaxL = this.inforPrestamo.montoMax;
          this.plazoMinL = this.inforPrestamo.plazoMin;
          this.plazoMaxL = this.inforPrestamo.plazoMax;
          this.tClienteL = this.inforPrestamo.tipo_cliente;
          document.getElementById('oculto').style.visibility = 'visible';
        })
        //this.router.navigate(["/template/amortizacion"]);
  }

  showAmortizationTable(){
    this.router.navigate(["/template/amortizacion"],{"queryParams": {"monto": this.montoSol, "plazo":  this.plazoSol, "tipoPrestamo": this.inforPrestamo.descripcion } });
  }
  obtenerListaCuentas() {
    this.cuentasService.getListaCuentas("100445689").subscribe((data) => {
      console.log("lista Cuentas", data);
      this.cuentas1 = data;
    });
  }

  obtenerListaPrestamos() {

    this.cuentasService.getListaPrestamos("100445689").subscribe((data) => {
      console.log("lista Prestamos", data);
      this.prestamos1 = data;
    });
  }

  obtenerUnUsuario() {
    this.cuentasService.getUnUsuario(this.curretUser).subscribe((data) => {
      console.log("usr", data);
      this.identificadorUsuario = [];

      this.unUsuario = data;
      this.identificadorUsuario.push({ label: this.unUsuario.apellidos + this.unUsuario.nombres + " - " + this.unUsuario.correoElectronico });
    });
  }

  updateInfo() {
    console.log("click");
    this.obtenerListaCuentas();
    this.obtenerListaPrestamos();
  }

}
