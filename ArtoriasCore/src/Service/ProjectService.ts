import { ProjectRepository } from '../Repository/ProjectRepository';

export class ProjectService {

    private projectRepository: ProjectRepository;

    constructor() {
        this.projectRepository = new ProjectRepository();
    }

    async getProjects() {
        return await this.projectRepository.getProjects();
    }

    async getProjectsByCreatorId(creatorId: string) {
        return await this.projectRepository.getProjectsByCreatorId(creatorId);
    }

    async getProjectByProjectId(projectId: string) {
        return await this.projectRepository.getProjectByProjectId(projectId);
    }

    async createProject(project: any) {
        return await this.projectRepository.createProject(project);
    }

    async updateProject(project: any) {
        return await this.projectRepository.updateProject(project);
    }

    async deleteProject(projectId: any) {
        return await this.projectRepository.deleteProject(projectId);
    }

}