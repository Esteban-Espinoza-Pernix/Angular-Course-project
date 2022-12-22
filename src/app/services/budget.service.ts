import { Injectable } from '@angular/core';
import { collectionData, addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import Budget from '../shared/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private firestore: Firestore) { }

  getBudgets() {
    const docRef = collection(this.firestore, 'Budgets');
    return collectionData(docRef, { idField: 'id' });
  }

  addBudget(newBudget: Budget) {
    const ItemRef = collection(this.firestore, 'Budgets');
    return addDoc(ItemRef, newBudget);
  }

  updateBudget(budget: Budget) {
    console.log(`Update budget.id: ${budget.id}`);
    const budgetRef = doc(this.firestore, `Budgets/${budget.id}`);
    return setDoc(budgetRef, { ...budget });
  }
}
