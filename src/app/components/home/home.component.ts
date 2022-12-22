import { Component } from "@angular/core";
import Item from "src/app/shared/item.model";
import { Category } from "src/app/shared/Category";
import { RegisterService } from "src/app/services/register.service";
import { FormBuilder } from "@angular/forms";
import { GlobalValues } from "src/app/shared/global-values";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  categories = Category;
  categoryTypes = Object.values(this.categories);
  currentCategory = "Todas";
  openForm = false;

  newItem: Item;
  allItems!: any[];

  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder,
    private globalValues: GlobalValues
  ) {
    this.newItem = {
      description: "",
      category: "Egreso Genérico",
      amount: 0,
    };
  }

  ngOnInit(): void {
    this.fillList();
  }

  get items() {
    if (this.currentCategory === "Todas") {
      return this.allItems;
    }
    return this.allItems.filter(
      (item) =>
        this.currentCategory.toLowerCase() === item.category.toLowerCase()
    );
  }

  fillList() {
    this.registerService.getItems().subscribe((all_items) => {
      this.allItems = all_items ?? [];
    });
  }

  clearNewItem() {
    this.newItem = {
      description: "",
      category: "Egreso Genérico",
      amount: 0,
    };
  }

  // DB functions

  addRegister(item: Item) {
    if (!item) return;

    //add to Backend
    this.registerService
      .addItem(item)
      .then((res) => {
        // add to UI
        console.log({res, item});
        res && this.allItems.push({ ...item });
        console.log("Item added successfully");
      })
      .catch((error) => console.error(error));

    //close form
    this.openForm = false;
    // clear data
    this.clearNewItem();

    //update globals
    console.log("=>", item.amount,item.category, this.categories.i1, item.category == this.categories.i1)
    item.category == this.categories.i1
      ? this.globalValues.addBudget(item.amount)
      : this.globalValues.addExpense(item.amount);
  }

  updateRegister(item: Item, id: number) {
    this.allItems[id] = { ...item };
    //edit from Backend
    this.registerService.updateItem(item).then(() => {
      //edit from UI
      this.allItems[id] = { ...item };
      console.log("Item updated successfully");
    });

    //update globals
    // item.category == this.categories.i1
    // ? this.globalValues.addBudget(-1 * item.amount)
    // : this.globalValues.addExpense(-1 * item.amount);
  }

  removeRegister(item: Item) {
    var confirmation = confirm("¿Está seguro que quiere eliminar el registro?");
    if (confirmation) {
      //remove from UI
      // this.allItems.splice(this.allItems.indexOf(item), 1);
      //remove from Backend
      this.registerService.deleteItem(item.id).then(() => {
        //remove from UI
        this.allItems.indexOf(item) !== -1 &&
          this.allItems.splice(this.allItems.indexOf(item), 1);
        console.log("Item deleted successfully");
      });

      //update globals
      item.category == this.categories.i1
      ? this.globalValues.addBudget(-1 * item.amount)
      : this.globalValues.addExpense(-1 * item.amount);
    }
  }
}
