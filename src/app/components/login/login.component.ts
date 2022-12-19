import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        // console.log(response);
        this.router.navigate(['/home']);
      })
      .catch((error) => console.error(error));
  }

  onGoogleLogin() {
    this.userService
      .google_login()
      .then((response) => {
        // console.log(response);
        this.router.navigate(['/home']);
      })
      .catch((error) => console.error(error));
  }
}
