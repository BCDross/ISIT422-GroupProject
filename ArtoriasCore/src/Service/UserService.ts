import { UserRepository } from '../Repository/UserRepository';

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers() {
        return await this.userRepository.getUsers();
    }

    async createUser(user: any) {
        return await this.userRepository.createUser(user);
    }

    async updateUser(user: any) {
        return await this.userRepository.updateUser(user);
    }

    async patchUser(user: any) {
        return await this.userRepository.patchUser(user);
    }

    async deleteUser(userId: any) {
        return await this.userRepository.deleteUser(userId);
    }

}