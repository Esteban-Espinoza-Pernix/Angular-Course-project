import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AlertsService } from './alert.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private alertService: AlertsService,
    private userService: UserService
  ) { }

  canActivate(): boolean {
    if (!this.userService.is_user_logged_in()) {
      this.alertService.showAlert('No autorizado. ¡Tienes que iniciar sesión primero!');
      console.log('Loggear primero')
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
