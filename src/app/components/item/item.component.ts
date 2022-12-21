import { Component, Input, Output, EventEmitter } from '@angular/core';
import Item from 'src/app/shared/item.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: Item;
  @Output() changeStatus = new EventEmitter<Item>();
  @Output() updateRegister = new EventEmitter<Item>();
  @Output() remove = new EventEmitter<Item>();
  editable = false;
  currency = "¢";
  itemCopy!: Item;

  ParseInt(value: string) : number {
    return parseInt(value);
  }

  ngOnInit() :void {
    this.itemCopy = {...this.item};
  }

  updateItem() {
    this.itemCopy = {...this.item};
    this.updateRegister.emit();
  }

  cancelUpdate() {
    this.editable = false;
    this.item = {...this.itemCopy};
  }

}
