import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList: LineItem[] = [
    { label: "Acorn Squash", image: "acorn_squash.png", quantity: 0 },
    { label: "Apple", image: "apple.png", quantity: 0 },
    { label: "Bell Pepper", image: "bell_pepper.png", quantity: 0 },
    { label: "Blueberries", image: "blueberries.png", quantity: 0 },
    { label: "Broccoli", image: "broccoli.png", quantity: 0 },
    { label: "Carrot", image: "carrot.png", quantity: 0 }
  ];

  _itemIntoCart: SelectedItem;

  @Input() set itemIntoCart(value: SelectedItem) {
    console.log("Cart Set itemIntoCart called!");
    if (value != undefined) {
      this.processItem(value.label, false, value.quantity);
      this._itemIntoCart = value;
    }
  }

  get itemIntoCart(): SelectedItem {
    console.log("Cart Get itemIntoCart called!");
    return this._itemIntoCart;
  }

  @Output()
  itemOutOfCart = new EventEmitter<SelectedItem>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cart ngOnChanges called!");
    // this.addItem(changes.itemIntoCart.currentValue);
  }

  processItem(nameOfItem: string, isRemoveFromCart = true, quantity = 1) {
    for (let itemInCart of this.cartList) {
      if (nameOfItem == itemInCart.label) {
        var toProcess: SelectedItem = { label: nameOfItem, quantity: quantity };
        if (isRemoveFromCart) {
          this.removeItem(itemInCart, toProcess);
        } else {
          this.addItem(itemInCart, toProcess);
        }
        break;
      }
    }
  }

  addItem(item: LineItem, toProcess: SelectedItem) {
    console.log("Cart addItem called!");
    item.quantity += toProcess.quantity;
  }

  removeItem(item: LineItem, toProcess: SelectedItem) {
    if (item.quantity >= toProcess.quantity) {
      item.quantity -= toProcess.quantity;
      console.log("Cart removeItem called! Item: " + toProcess.quantity + ", Quantity: " + toProcess.label);
      this.itemOutOfCart.next(toProcess);
    }
  }
}
