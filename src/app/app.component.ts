import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BudgetService } from "./services/budget.service";
import { RegisterService } from "./services/register.service";
import Budget from "./shared/budget.model";
import { GlobalValues } from "./shared/global-values";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Angular-Course-project";
  items = [];

  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private globalValues: GlobalValues,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    //load budget
    this.budgetService.getBudgets().subscribe((budgets) => {
      if (budgets.length) {
        this.globalValues.setBudget(budgets[budgets.length - 1] as Budget);

        this.registerService.getItems().subscribe((all_items) => {
          let total = 0;
          all_items.forEach(item => {
            total +=item['amount'];
          });
          this.globalValues.setExpense(total);
        });
      }
    });
  }

  isLogin(): boolean {
    return this.router.url === "/login" || this.router.url === "/signup";
  }
}
