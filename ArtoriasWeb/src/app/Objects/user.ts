export class User {
    _id?: string;
    firstName: string;
    lastName: string;
    title?: string;
    email: string;
    password: string;
    createDate?: string;
    modifiedDate?: string;
    createdBy?: string;
    modifiedBy?: string;
    __v?: number;

    constructor(firstName: string, lastName:string, email:string, password:string,title?:string, id?: string){
        this._id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.email = email;
        this.password = password;
    }
}