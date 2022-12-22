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
  loadBudget = true;
  loadItems = true;

  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private globalValues: GlobalValues,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    //load budget
    this.budgetService.getBudgets().subscribe((budgets) => {
      if (this.loadBudget) {
        console.log("load budget");
        this.loadBudget = false;
        this.globalValues.setBudget(budgets[budgets.length - 1] as Budget);

        this.registerService.getItems().subscribe((all_items) => {
          if(this.loadItems) {
            console.log("load items");
            let totalExpenses = 0;
            let totalBudgets = 0;
            this.loadItems = false;
            all_items.forEach(item => {
              // total +=item['amount'];
              item["category"] == "Ingreso"
                ? totalBudgets += item['amount']
                : totalExpenses += item['amount']
            });
            this.globalValues.setExpense(totalExpenses);
            this.globalValues.addBudget(totalBudgets);
          }
        });
      }
    });
  }

  isLogin(): boolean {
    return this.router.url === "/login" || this.router.url === "/signup";
  }
}
