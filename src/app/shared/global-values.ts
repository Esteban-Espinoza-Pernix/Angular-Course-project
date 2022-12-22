import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import Budget from "./budget.model";

@Injectable({
  providedIn: 'root'
})

export class GlobalValues {
  public budget: BehaviorSubject<Budget> = new BehaviorSubject({
    amount: 10000,
    currency: "¢"
  })
  public totalExpenses: BehaviorSubject<number> = new BehaviorSubject(0);
  public balance: BehaviorSubject<number> = new BehaviorSubject(0);

  public budgetObs = this.budget.asObservable();
  public totalExpensesObs = this.totalExpenses.asObservable();
  public balanceObs = this.balance.asObservable();

  public setBudget(budget: Budget) {
    this.budget.next(budget);
  }

  public addBudget(newAmount: number) {
    newAmount = this.budget.value.amount + newAmount;
    this.budget.next({
      amount: newAmount,
      currency: this.budget.value.currency
    })
  }

  public addExpense(amount: number) {
    this.totalExpenses.next(this.totalExpenses.value + amount);
    this.setBalance();
  }

  private setBalance() {
    this.balance.next(this.budget.value.amount - this.totalExpenses.value);
  }

  private resetValues() {
    this.budget.next({
      amount: 0,
      currency: ""
    })
    this.totalExpenses.next(0);
    this.balance.next(0);
  }
}
