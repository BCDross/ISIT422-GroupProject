import {Item} from './item';

export class Project {
    _id?: string;
    name: string;
    description: string;
    creator: string;

    constructor(name: string, description: string, creator: string, id?:string){
        this.name = name;
        this.description = description;
        this.creator = creator;
        this._id = id;
    }
}