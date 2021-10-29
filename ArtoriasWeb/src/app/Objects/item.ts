
export class Item{
    name: string;
    status: string; //new, open, closed, etc. Whatever column it goes in.
    priority: number; // user-defined priority
    description: string; //optional description
    type: string; //Epic, feature, user story, issue, whatever.

    constructor(name: string, status: string, priority: number, type: string, description?: string){
        this.name = name;
        this.status = status;
        this.priority = priority;
        this.type = type;
        if (description) {
            this.description = description;
        } 
        else {
            this.description = "";
        }

    }

}