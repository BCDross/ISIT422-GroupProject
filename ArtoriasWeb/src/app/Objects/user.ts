import {Project} from './project';

export class User {
    id: number;
    projects: Project[];
    firstName: string;
    lastName: string;
    title: string;

    constructor(id: number, firstName: string, lastName:string, title:string, projects?: Project[]){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        if (projects) {
            this.projects = projects;
        }
        else {
            this.projects = [];
        }
    }
}