import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export interface LineItem {
  label: string;
  image: string;
  quantity: number;
}

export interface SelectedItem {
  label: string;
  quantity: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventoryList: LineItem[] = [
    { label: "Acorn Squash", image: "acorn_squash.png", quantity: 10 },
    { label: "Apple", image: "apple.png", quantity: 15 },
    { label: "Bell Pepper", image: "bell_pepper.png", quantity: 20 },
    { label: "Blueberries", image: "blueberries.png", quantity: 25 },
    { label: "Broccoli", image: "broccoli.png", quantity: 30 },
    { label: "Carrot", image: "carrot.png", quantity: 35 }
  ];

  _itemIntoInventory: SelectedItem;

  @Input() set itemIntoInventory(value: SelectedItem) {
    console.log("Inventory Set itemIntoInventory called!");
    if (value != undefined) {
      this.processItem(value.label, false, value.quantity);
      this._itemIntoInventory = value;
    }
  }

  get itemIntoInventory(): SelectedItem {
    console.log("Inventory Get itemIntoInventory called!");
    return this._itemIntoInventory;
  }

  @Output()
  itemOutOfInventory = new EventEmitter<SelectedItem>();

  constructor() { }

  ngOnInit() {
  }

  processItem(nameOfItem: string, isAddToCart = true, quantity = 1) {
    for (let itemInInventory of this.inventoryList) {
      if (nameOfItem == itemInInventory.label) {
        var toProcess: SelectedItem = { label: nameOfItem, quantity: quantity };
        if (isAddToCart) {
          this.removeItem(itemInInventory, toProcess);
        } else {
          this.addItem(itemInInventory, toProcess);
        }
        break;
      }
    }
  }

  addItem(item: LineItem, toProcess: SelectedItem) {
    item.quantity += toProcess.quantity;
  }

  removeItem(item: LineItem, toProcess: SelectedItem) {
    if (item.quantity >= toProcess.quantity) {
      item.quantity -= toProcess.quantity;
      console.log("Inventory removeItem called! Item: " + toProcess.quantity + ", Quantity: " + toProcess.label);
      this.itemOutOfInventory.next(toProcess);
    }
  }
}
