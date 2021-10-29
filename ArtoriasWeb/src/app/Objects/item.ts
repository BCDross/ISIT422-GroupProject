
export class Item{
    id: number;
    name: string;
    status: string; //new, open, closed, etc. Whatever column it goes in.
    priority: number; // user-defined priority
    description: string; //optional description
    type: string; //Epic, feature, user story, issue, whatever.
    parent?: Item;
    children?: Item[];
    owner?: string;

    constructor(id:number, name: string, status: string, priority: number, type: string, owner?: string, parent?: Item, children?: Item[], description?: string){
        this.id = id;
        this.name = name;
        this.status = status;
        this.priority = priority;
        this.type = type;
        this.owner = owner;
        if (description) {
            this.description = description;
        } 
        else {
            this.description = "";
        }

    }

}