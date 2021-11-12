import { model, Schema, Model, Document, ObjectId } from 'mongoose';
import { ItemController } from '../Controllers/ItemController';
import { UserModel } from './UserModel'

export interface IItem extends Document {
    name: String;
    status: String;
    priority: Number;
    description: String;
    type: String;
    creator: String;
    parent?: ObjectId;
    children?: ObjectId[];
    owner?: String;
    createDate: Date;
    modifiedDate: Date;
}

const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    createdBy: { type: String, required: false },
    parent: Schema.Types.ObjectId,
    children: [Schema.Types.ObjectId],
    owner: { type: String },
    createDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
});

export const ItemModel: Model<IItem> = model<IItem>('items', ItemSchema);