import { model, Schema, Model, Document } from 'mongoose';

export interface IProject extends Document {
    name: String;
    creator: String;
    items: String;
    createDate: Date;
    createdBy: String;
    
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    items: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: false }
});

export const ProjectModel: Model<IProject> = model<IProject>('projects', ProjectSchema);