import { UserRepository } from '../Repository/UserRepository';

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers() {
        return await this.userRepository.getUsers();
    }

    async getUserByID(userId: any) {
        return await this.userRepository.getUserByID(userId);
    }

    async getUserByEmail(email: any) {
        return await this.userRepository.getUserByEmail(email);
    }

    async createUser(user: any) {
        return await this.userRepository.createUser(user);
    }

    async updateUser(user: any) {
        return await this.userRepository.updateUser(user);
    }

    async deleteUser(userId: any) {
        return await this.userRepository.deleteUser(userId);
    }

}