import {Project} from './project';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    password: string;
    projects: Project[];

    constructor(id: number, firstName: string, lastName:string, title:string, email:string, password:string, projects?: Project[]){
        this.id = id;
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