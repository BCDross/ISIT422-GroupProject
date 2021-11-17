import { APILogger } from '../Logger/apiLogger';
import { ProjectService } from '../Service/ProjectService';

export class ProjectController {

    private projectService: ProjectService;
    private logger: APILogger;

    constructor() {
        this.projectService = new ProjectService();
        this.logger = new APILogger()
    }

    async getProjects() {
        this.logger.info('Controller: getProjects', null)
        return await this.projectService.getProjects();
    }

    async createProject(project: any) {
        this.logger.info('Controller: createProject', project);
        return await this.projectService.createProject(project);
    }

    async updateProject(project: any) {
        this.logger.info('Controller: updateProject', project);
        return await this.projectService.updateProject(project);
    }

    async deleteProject(projectId: any) {
        this.logger.info('Controller: deleteProject', projectId);
        return await this.projectService.deleteProject(projectId);
    }
}