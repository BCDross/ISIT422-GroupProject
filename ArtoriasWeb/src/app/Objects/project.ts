import {Item} from './item';

export class Project {
    name: string;
    items: Item[];

    constructor(name: string){
        this.items = [];
        this.name = name;
    }
}