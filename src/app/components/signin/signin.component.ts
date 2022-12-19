import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent {
  formReg!: FormGroup;
  
  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  
  onSubmit() {
    this.userService
      .register(this.formReg.value)
      .then((response) => {
        // console.log(response);
        this.router.navigate(['/login']);
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
