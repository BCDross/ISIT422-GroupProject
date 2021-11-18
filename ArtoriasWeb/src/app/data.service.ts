import { Injectable } from '@angular/core';
import { Item } from './Objects/item';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './Objects/user';
import { Project } from './Objects/project';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user?: User;
  items: Item[] = [];
  projects: Project[] = [];
  

  constructor(private http: HttpClient) { 
    this.items = [];
  }

  getItems() {
    console.log("Returning items.");
    return this.http.get("http://localhost:8080/api/items");
  }

  addItem(newItem: Item) {
    let transferObject = {
      user: {
        name: newItem.name,
        status: newItem.status,
        priority: newItem.priority,
        description: newItem.description,
        type: newItem.type,
        creatorID: "fakeID",
        projectID: "fakeID",
        parentID: newItem.parentID,
        owner: newItem.owner
      }
    }

    let response = this.http.post("http://localhost:8080/api/item", transferObject);
    response.subscribe(response => console.log(response));

    return response;
  }

  addUser(newUser: User) {
    let transferObject = {
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        title: newUser.title
      }
    };
    let response = this.http.post("http://localhost:8080/api/user", transferObject);
    //response.subscribe(user => this.user = (user as User));
    
    return response;
    // .pipe(
    //   catchError(this.handleError('addUser', transferObject))
    // ); how the fuck does this thing work actually
  }

  // handleError(method: string, json: object): ObservableInput<any> {

  // }
}
