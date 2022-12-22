import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BudgetService } from "src/app/services/budget.service";
import Budget from "src/app/shared/budget.model";
import { Currency } from "src/app/shared/Currency";
import { GlobalValues } from "src/app/shared/global-values";

@Component({
  selector: "app-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.css"],
})
export class BudgetComponent {
  formBudget: FormGroup;
  currency = Currency;
  requiredValue = true;

  currencyTypes = Object.values(this.currency);

  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private globalValues: GlobalValues
  ) {
    this.formBudget = new FormGroup({
      amount: new FormControl(),
      currency: new FormControl(),
    });
  }

  onSubmit() {
    let auxBudget: Budget = this.formBudget.value as Budget;
    this.budgetService
      .addBudget(auxBudget)
      .then(() => {
        console.log("Successfully saved");
        this.globalValues.setBudget(auxBudget);
        this.router.navigate(["/registros"]);
      })
      .catch((err) => console.log(err));
  }
}
