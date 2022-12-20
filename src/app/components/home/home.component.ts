import { Component } from '@angular/core';
import Item from 'src/app/shared/item.model';
import { Category } from 'src/app/shared/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories = Category;
  categoryTypes = Object.values(this.categories);
  currentCategory = "Todas";
  openForm = false;


  newItem : Item;

  allItems: Item[] = [
    { amount: 2000, category: "Egreso Genérico", description: "gasto normal" },
    { amount: 3000, category: "Transporte", description: "gasto bus" },
  ];

  constructor() {
    this.newItem = {
      id: "",
      description : "",
      category: "Egreso Genérico",
      amount: 0
    };
    console.log(this.newItem);
  }

  get items() {
    if (this.currentCategory === "Todas") {
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

  addRegister(item: Item) {
    console.log("guardar", item);
  }

  updateDescription(new_description: string, id: number) {
    this.allItems[id].description = new_description;
  }

  removeItem(item: Item, index: number) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

}
