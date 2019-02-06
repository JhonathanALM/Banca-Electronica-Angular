import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
//import {StorageService} from "../services/storage.service";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private zns: LoginService, private route: ActivatedRoute, private service: MessageService) { }

  usuarios: any = [];//variable de prueba para retorno de servicio
  user: any = "";//variable que toma el usuario
  contra: any = "";//variable que toma la contraseña
  correcto: any = [];
  incorrecto: any = [];
  msgs: Message[] = [];

  ngOnInit() {

  }

  submit() {
    this.btnLogin();
  }
  btnLogin() {
    console.log("USUER:", this.user);
    console.log("CONTR:", this.contra);
    return this.zns.getListaCuentas(this.user).subscribe((data) => {
      this.usuarios = data;
      console.log(data);
      let j = 0;
      let k = 0;
      if ((this.user == this.usuarios.usuario) && (this.contra == this.usuarios.clave)) {
        this.correcto = this.usuarios;
        j = j + 1;
        console.log('correcto');
      } else {
        this.incorrecto = this.usuarios;
        k = k + 1;
        this.showErrorViaToast();
        console.log('incorrecto');
      }

      if (this.correcto.length != 0) {
        console.log("user: ", this.correcto.usuario);
        let token = this.correcto.ci;
        this.zns.setToken(this.correcto.ci);
        this.zns.setUser(this.correcto.ci);
        this.router.navigate(["/template/main"]);
      } else {
        //location.reload();
        this.user = '';
        this.contra = '';
        
      }
    }, err=>{
      this.showErrorViaToast();
      this.contra="";
    });
  }
  showErrorViaToast() {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Fallo Inicio de Sesión', detail: 'Usuario o Contraseña Inválidos' });

  }

}