import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    title: String;
    createDate: Date;
    modifiedDate: Date;
    createdBy: String;
    modifiedBy: String;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    title: { type: String, required: false },
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: false },
    modifiedBy: { type: String, required: false }
});

export const UserModel: Model<IUser> = model<IUser>('user', UserSchema);