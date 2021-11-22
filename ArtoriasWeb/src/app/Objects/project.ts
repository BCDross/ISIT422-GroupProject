import {Item} from './item';

export class Project {
    _id: string;
    name: string;
    creator: string;

    constructor(id:string, name: string, creator: string){
        this._id = id;
        this.name = name;
        this.creator = creator;
    }
}