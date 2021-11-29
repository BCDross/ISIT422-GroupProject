import { Injectable } from '@angular/core';
import { Item } from './Objects/item';
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
  currentProject?: Project;
  

  constructor(private http: HttpClient) { 
  }

  getAllItems() {
    console.log("Returning items.");
    return this.http.get("http://localhost:8080/api/items");
  }

  getAllProjects() {
    console.log("Returning Projects.");
    return this.http.get("http://localhost:8080/api/projects");
  }

  addItem(newItem: Item) {
    let transferObject = {
      item: {
        name: newItem.name,
        status: newItem.status,
        priority: newItem.priority,
        description: newItem.description,
        type: newItem.type,
        creatorId: "fakeID",
        projectId: "fakeID",
        parentId: newItem.parentID,
        owner: newItem.owner
      }
    }

    return this.http.post("http://localhost:8080/api/item", transferObject);
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
    
    return response;
    // .pipe(
    //   catchError(this.handleError('addUser', transferObject))
    // ); how the fuck does this thing work actually
  }

  addProject(newProject: Project) {
    let transferObject = {
      project: {
        name: newProject.name,
        description: newProject.description,
        creatorId: newProject.creator
      }
    };
    let response = this.http.post("http://localhost:8080/api/project", transferObject);
    return response;
  }

  getUserByEmail(email: string) {
    let params: HttpParams = new HttpParams();
    params.append("email",email);

    let response = this.http.get("http://localhost:8080/api/user",{params});

    response.subscribe(user => this.user = (user as User));

    return response;
  }

  getProjectsByUserId() {
    if (this.user && this.user._id) {
      let params: HttpParams = new HttpParams();
      params.append("creatorId",this.user._id);

      return this.http.get("http://localhost:8080/api/projects", {params});
    }
    else {
      return undefined; //I need to come up with a better way to deal with this
    }
    
  }

  updateItem(updatedItem: Item) {
    let transferObject = {
      item: updatedItem
    };
    //console.log(transferObject.item._id);
    this.http.put("http://localhost:8080/api/item", transferObject).subscribe(item => console.log(item));
  }

  // handleError(method: string, json: object): ObservableInput<any> {

  // }

  updateProject(updatedProject: Project) {
    let transferObject = {
      project: updatedProject
    };
    this.http.put("http://localhost:8080/api/project", transferObject).subscribe(project => console.log(project));
  }
}
