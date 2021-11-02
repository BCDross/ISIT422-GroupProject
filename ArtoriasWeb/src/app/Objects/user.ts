import {Project} from './project';

export class User {
    id: number;
    projects: Project[];

    constructor(id: number, projects?: Project[]){
        this.id = id;
        if (projects) {
            this.projects = projects;
        }
        else {
            this.projects = [];
        }
    }
}