import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BudgetService } from "src/app/services/budget.service";
import { RegisterService } from "src/app/services/register.service";
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
  resetItems = true;
  resetBudgets = true;
  isFirstTime = true;

  currencyTypes = Object.values(this.currency);

  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private globalValues: GlobalValues,
    private registerService: RegisterService
  ) {
    this.formBudget = new FormGroup({
      amount: new FormControl(),
      currency: new FormControl(),
    });
  }

  onSubmit() {
    this.resetItems = true;
    this.resetBudgets = true;
    //clear database
    this.resetData();
    // if (this.isFirstTime) {
    //   this.isFirstTime = false;
    // }

    let auxBudget: Budget = this.formBudget.value as Budget;
    this.budgetService
      .addBudget(auxBudget)
      .then(() => {
        this.globalValues.setBudget(auxBudget);
        this.router.navigate(["/registros"]);
        console.log("Successfully saved");
      })
      .catch((err) => console.log(err));
  }

  resetData() {

    //delete Items
    this.registerService.getItems().subscribe((allItems) => {
      if(this.resetItems) {
        console.log("reset items");
        this.resetItems = false;
        allItems.forEach((item, i) => {
          this.registerService.deleteItem(item["id"]);
        });
      }
    });

    //delete Budgets
    this.budgetService.getBudgets().subscribe((allBudgets) => {
      if(this.resetBudgets) {
        console.log("reset budget");
        this.resetBudgets = false;
        allBudgets.forEach(budget => {
          this.budgetService.deleteBudget(budget["id"]);
        });
      }
    });

    // //reset UI values
    this.globalValues.resetValues();
  }
}
