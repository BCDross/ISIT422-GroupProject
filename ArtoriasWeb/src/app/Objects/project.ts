import {Item} from './item';

export class Project {
    id: number;
    name: string;
    items: Item[];

    constructor(id:number, name: string, items?: Item[]){
        this.id = id;
        this.name = name;
        if (items) {
            this.items = items;
        }
        else {
            this.items = [];
        }
    }
}