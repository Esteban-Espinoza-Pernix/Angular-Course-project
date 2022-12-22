import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { GlobalValues } from "src/app/shared/global-values";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private globalValues: GlobalValues
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        this.globalValues.budget.value.amount
          ? this.router.navigate(["/registros"])
          : this.router.navigate(["/presupuesto"]);
      })
      .catch((error) => console.error(error));
  }

  onGoogleLogin() {
    this.userService
      .google_login()
      .then((response) => {
        this.globalValues.budget.value.amount
          ? this.router.navigate(["/registros"])
          : this.router.navigate(["/presupuesto"]);
      })
      .catch((error) => console.error(error));
  }
}
