import {Project} from './project';

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    title?: string;
    email: string;
    password: string;
    projects: Project[];

    constructor(id: string, firstName: string, lastName:string, email:string, password:string,title?:string, projects?: Project[]){
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.email = email;
        this.password = password;
        if (projects) {
            this.projects = projects;
        }
        else {
            this.projects = [];
        }
    }
}