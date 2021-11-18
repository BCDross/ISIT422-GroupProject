
export class Item{
    _id: string;
    name: string;
    status: string; //new, open, closed, etc. Whatever column it goes in.
    priority: number; // user-defined priority
    description: string; //optional description
    type: string; //Epic, feature, user story, issue, whatever.
    creatorID: string;
    projectID: string;
    parentID?: string;
    //parent?: Item;
    //children?: Item[];
    owner?: string;
    createDate?: string;
    modifiedDate?: string;
    __v?: number;

    constructor(id:string, name: string, status: string, priority: number, type: string, projectID: string, creatorID: string, parentID?: string, description?: string, owner?: string, parent?: Item, children?: Item[]){
        this._id = id;
        this.name = name;
        this.status = status;
        this.priority = priority;
        this.type = type;
        this.owner = owner;
        this.creatorID = creatorID;
        this.projectID = projectID;
        this.parentID = parentID;
        if (description) {
            this.description = description;
        } 
        else {
            this.description = "";
        }

    }

}