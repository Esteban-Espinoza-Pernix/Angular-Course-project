import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/Category';
import { FormControl, FormGroup } from '@angular/forms';
import Item from 'src/app/shared/item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
  formItem: FormGroup;

  @Input() item!: Item;
  @Input() isNew!: boolean;
  @Output() onSubmit = new EventEmitter<Item>();
  @Output() onCancel = new EventEmitter<Item>();


  categories = Category;
  categoryTypes = Object.values(this.categories);

  // categoryTypes = Object.values(this.categories);

  constructor(private router: Router) {
    this.formItem = new FormGroup({
      id: new FormControl(),
      description: new FormControl(),
      category: new FormControl(),
      amount: new FormControl(),
    });
  }
}
