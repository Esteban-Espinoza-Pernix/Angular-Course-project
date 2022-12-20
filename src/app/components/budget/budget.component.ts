import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Currency } from 'src/app/shared/Currency';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  formBudget: FormGroup;
  currency = Currency;
  requiredValue = true;

  currencyTypes = Object.values(this.currency);

  constructor(private router: Router) {
    this.formBudget = new FormGroup({
      monto: new FormControl(),
      divisa: new FormControl(),
    });
  }

  onSubmit() {
    // agregar lógica
    console.log("submit");
  }
}
