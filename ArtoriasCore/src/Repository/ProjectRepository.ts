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

    async getProjectByProjectId(projectId: any) {
        const project = await ProjectModel.find(projectId);
        console.log('project:::', project);
        return project;
    }
    
    async getProjectsByCreatorId(creatorId: string) {
        const projects = await ProjectModel.find({ creatorId: creatorId });
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
            data = await ProjectModel.updateOne({_id: project._id},{
                name: project.name,
                description: project.description,
                creatorId: project.creatorId,
                createDate: project.createDate
            });
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