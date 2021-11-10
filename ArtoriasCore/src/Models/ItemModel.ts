import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    createDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
}

const UserSchema: Schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false }
});

export const UserModel: Model<IUser> = model<IUser>('users', UserSchema);