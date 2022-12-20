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
  @Output() updateDescription = new EventEmitter<Item>();
  @Output() remove = new EventEmitter<Item>();
  editable = false;
  currency = "¢";

  ParseInt(value: string) : number {
    
    return parseInt(value);
  }

}
