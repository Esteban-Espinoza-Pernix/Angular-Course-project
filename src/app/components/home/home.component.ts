import { Component } from '@angular/core';
import Item from 'src/app/shared/item.model';
import { Category } from 'src/app/shared/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Angular Todo';
  categories = Category;

  currentCategory = this.categories.all;

  allItems: Item[] = [
    { amount: 2000, category: "Egreso genérico", description: "gasto normal" },
    { amount: 3000, category: "transporte", description: "gasto bus" },
  ];

  constructor() {}

  get items() {
    if (this.currentCategory === this.categories.all) {
      return this.allItems;
    }
    return this.allItems.filter((item) =>
      this.currentCategory.toLowerCase() === item.category.toLowerCase()
    );
  }

  addItem(new_description: string) {
    if (!new_description) return;
    this.allItems.push({
      description: new_description,
      category: "transporte",
      amount: 2000,
    });
  }

  updateDescription(new_description: string, id: number) {
    this.allItems[id].description = new_description;
  }

  removeItem(item: Item, index: number) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

}
