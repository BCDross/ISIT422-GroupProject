import { Injectable } from '@angular/core';
import { Item } from './Objects/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  items: Item[];

  constructor() { 
    this.items = [];
  }

  getItems() {
    console.log("Returning items.");
    return this.items;
  }

  addItem(newItem: Item) {
    this.items.push(newItem);
    console.log("New item received");
  }
}
