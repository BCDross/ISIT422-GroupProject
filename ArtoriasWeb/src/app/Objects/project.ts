import {Item} from './item';

export class Project {
    id: number;
    name: string;
    items: Item[];
    creator: string;

    constructor(id:number, name: string, creator: string, items?: Item[]){
        this.id = id;
        this.name = name;
        this.creator = creator;
        if (items) {
            this.items = items;
        }
        else {
            this.items = [];
        }
    }
}