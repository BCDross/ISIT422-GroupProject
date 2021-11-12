import { connect, disconnect } from "../Config/db.config";
import { ProjectModel } from '../Models/ProjectModel';
import { APILogger } from '../Logger/apiLogger';

export class ProjectRepository {

    private logger: APILogger;

    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getProjects() {
        const projects = await ProjectModel.find({});
        console.log('projects:::', projects);
        return projects;
    }

    async createProject(project: any) {
        let data = {};
        try {
            data = await ProjectModel.create(project);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateProject(project: any) {
        let data = {};
        try {
            data = await ProjectModel.updateOne(project);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteProject(projectId: any) {
        let data: any = {};
        try {
            data = await ProjectModel.deleteOne({_id : projectId});
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }
}