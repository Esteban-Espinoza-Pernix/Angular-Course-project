import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private alert: AlertService,
    private userService: UserService
  ) { }

  onLogout() {
    this.userService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((_error) => this.alert.showAlert('Ocurrio un error, intentalo de nuevo.'))

  }
}
