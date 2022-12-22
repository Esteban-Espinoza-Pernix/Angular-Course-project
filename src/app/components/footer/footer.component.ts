import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalValues } from 'src/app/shared/global-values';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  budget = this.globalValues.budget.value.currency + " " + this.globalValues.budget.value.amount;
  totalExpenses = this.globalValues.budget.value.currency + " " + this.globalValues.totalExpenses.value;
  balance = this.globalValues.budget.value.currency + " " + this.globalValues.balance.value;

  budgetSubscription!: Subscription;
  totalExpensesSubscription!: Subscription;
  balanceSubscription!: Subscription;

  constructor(private globalValues: GlobalValues) {}

  ngOnInit() {
    this.budgetSubscription = this.globalValues.budgetObs.subscribe(m => {
      this.budget = this.globalValues.budget.value.currency + " " + this.globalValues.budget.value.amount;
    });
    this.totalExpensesSubscription = this.globalValues.totalExpensesObs.subscribe(m => {
      this.totalExpenses = this.globalValues.budget.value.currency + " " + this.globalValues.totalExpenses.value;
    });
    this.balanceSubscription = this.globalValues.balanceObs.subscribe(m => {
      this.balance = this.globalValues.budget.value.currency + " " + this.globalValues.balance.value;
    });
  }
}
