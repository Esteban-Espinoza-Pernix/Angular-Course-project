import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { GlobalValues } from "src/app/shared/global-values";
import { Subscription } from "rxjs";
import { RegisterService } from "src/app/services/register.service";
import { BudgetService } from "src/app/services/budget.service";
import Budget from "src/app/shared/budget.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  formLogin: FormGroup;

  itemsSubscription!: Subscription;
  budgetsSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private globalValues: GlobalValues,
    private registerService: RegisterService,
    private budgetService: BudgetService,
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  // ngOnInit(): void {
  //   //load budget
  //   this.budgetsSubscription = this.budgetService.getBudgets().subscribe((budgets) => {
  //     if (budgets.length) {
  //       this.globalValues.setBudget(budgets[budgets.length - 1] as Budget);

  //       this.itemsSubscription = this.registerService.getItems().subscribe((all_items) => {
  //         let total = 0;
  //         all_items.forEach(item => {
  //           total +=item['amount'];
  //         });
  //         this.globalValues.setExpense(total);
  //       });
  //     }
  //   });
  // }

  // ngOnDestroy(): void {
  //   console.log("Destroy");
  //   this.itemsSubscription.unsubscribe;
  //   this.budgetsSubscription.unsubscribe;
  // }

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
