import { LoginService } from './Services/Service/login.service';
import { Component } from '@angular/core';
import { AppComponent} from './app.component';
import { TemplateComponent} from './template/template.component';
import { FechaService } from './Services/Service/fecha.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    fecha:any;
    constructor(private loginService: LoginService,public app: TemplateComponent, private fechaService: FechaService) {}
    onLogout():void{
      this.loginService.logoutUser();
    }
    obtenerFecha() {
      this.fechaService.getFecha().subscribe((data) => {
        console.log("lista Cuentas", data);
        this.fecha = data;
      });
    }
}
