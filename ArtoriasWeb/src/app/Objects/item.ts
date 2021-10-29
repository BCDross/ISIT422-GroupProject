
export class Item{
    name: string;
    status: string;
    priority: number;
    description: string;

    constructor(name: string, status: string, priority: number, description?: string){
        this.name = name;
        this.status = status;
        this.priority = priority;
        if (description) {
            this.description = description;
        } 
        else {
            this.description = "";
        }

    }

}