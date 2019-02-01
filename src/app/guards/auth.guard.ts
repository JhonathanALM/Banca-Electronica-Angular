import { LoginService } from './../Services/Service/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  curretUser: any;

  constructor(private authService: LoginService, private route: Router) { }

  canActivate() {
    this.curretUser = this.authService.getCurrentUser();
    console.log("currentUser=====>", this.curretUser);
    if (this.authService.getCurrentUser == null) {
      this.route.navigate['/'];
      return false;
    } else {
      return true;
    }
  }
}
