import { Injectable } from '@angular/core';
import { Item } from './Objects/item';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './Objects/user';
import { Project } from './Objects/project';
import { Observable } from 'rxjs';
import { LoginInfo } from './login-form/login-form.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user?: User;
  items: Item[] = [];
  projects: Project[] = [];
  currentProject?: Project;
  // private url = "https://artoriascore.azurewebsites.net";
  private url = "http://localhost:8080";

  constructor(private http: HttpClient, private router: Router) { 
  }

  ngOnInit(): void {
  }

  getAllItems() {
    console.log("Returning items.");
    return this.http.get(this.url+ "/api/items");
  }

  deleteItem(deletedItem: Item) {
    return this.http.delete(this.url+ "/api/item/"+deletedItem._id);
  }

  getItemsByProject() {
    if (this.currentProject) {
      return this.http.get(this.url+ "/api/items/"+this.currentProject._id);
    }
    else {
      return new Observable;
    }
  }

  getAllProjects() {
    console.log("Returning Projects.");
    return this.http.get(this.url+ "/api/projects");
  }

  addItem(newItem: Item) {
    let transferObject = {
      item: {
        name: newItem.name,
        status: newItem.status,
        priority: newItem.priority,
        description: newItem.description,
        type: newItem.type,
        creatorId: newItem.creatorID,
        projectId: newItem.projectID,
        parentId: newItem.parentID,
        owner: newItem.owner
      }
    }

    return this.http.post(this.url+ "/api/item", transferObject);
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
    let response = this.http.post(this.url+ "/api/user", transferObject);
    
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
    let response = this.http.post(this.url+ "/api/project", transferObject);
    return response;
  }

  getUserByEmail(email: string) {
    // let params: HttpParams = new HttpParams();
    // params.append("email",email);

    let response = this.http.get(this.url+ "/api/user/"+email);

    //response.subscribe(user => this.user = (user as User));

    return response;
  }

  userLogin(loginInfo: LoginInfo) {
    return this.http.get(this.url+ "/api/login/"+loginInfo.email + "/" + loginInfo.password);
  }

  getProjectsByUserId() {
    if (this.user && this.user._id) {
      // let params: HttpParams = new HttpParams();
      // params.append("creatorId",this.user._id);

      return this.http.get(this.url+ "/api/projects/"+this.user._id);
    }
    else {
      return new Observable; //I need to come up with a better way to deal with this
    }
    
  }

  updateItem(updatedItem: Item) {
    let transferObject = {
      item: updatedItem
    };
    //console.log(transferObject.item._id);
    this.http.put(this.url+ "/api/item", transferObject).subscribe(item => console.log(item));
  }

  // handleError(method: string, json: object): ObservableInput<any> {

  // }

  updateProject(updatedProject: Project) {
    let transferObject = {
      project: updatedProject
    };
    this.http.put(this.url+ "/api/project", transferObject).subscribe(project => console.log(project));
  }

  setCurrentProject(project: Project) {
    this.currentProject = project;
    
  }
}
