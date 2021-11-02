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
    return this.items;
  }

  addItem(newItem: Item) {
    this.items.push(newItem);
  }
}
