import { LoginService } from './services/service/login.service';
import { Component } from '@angular/core';
import { AppComponent} from './app.component';
import { TemplateComponent} from './template/template.component';
@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(private loginService: LoginService,public app: TemplateComponent) {}
    onLogout():void{
      this.loginService.logoutUser();
    }
}
