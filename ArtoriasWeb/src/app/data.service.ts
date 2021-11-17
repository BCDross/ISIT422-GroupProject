import { Injectable } from '@angular/core';
import { Item } from './Objects/item';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './Objects/user';
import { Project } from './Objects/project';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  userID: any = null;
  items: Item[] = [];
  projects: Project[] = [];
  

  constructor(private http: HttpClient) { 
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
