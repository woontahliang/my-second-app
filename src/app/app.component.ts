import { Component } from '@angular/core';

export interface SelectedItem {
  label: string;
  quantity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cartItem: SelectedItem;
  inventoryItem: SelectedItem;

  moveToCart(item: SelectedItem) {
    console.log("App moveToCart called! Item: " + item.label + ", Quantity: " + item.quantity);
    this.cartItem = item;
  }

  moveToInventory(item: SelectedItem) {
    console.log("App moveToInventory called! Item: " + item.label + ", Quantity: " + item.quantity);
    this.inventoryItem = item;
  }
}
