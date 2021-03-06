import { APILogger } from '../Logger/apiLogger';
import { UserService } from '../Service/UserService';

export class UserController {

    private userService: UserService;
    private logger: APILogger;

    constructor() {
        this.userService = new UserService();
        this.logger = new APILogger()
    }

    async getUsers() {
        this.logger.info('Controller: getUsers', null)
        return await this.userService.getUsers();
    }

    async getUserByEmail(email: any) {
        this.logger.info('Controller: getUserByEmail', email)
        return await this.userService.getUserByEmail(email);
    }

    async userLogin(email: any, password: any) {
        //this.logger.info('Controller: userLogin', user, password)
        return await this.userService.userLogin(email, password);
    }

    async createUser(user: any) {
        this.logger.info('Controller: createUser', user);
        return await this.userService.createUser(user);
    }

    async updateUser(user: any) {
        this.logger.info('Controller: updateUser', user);
        return await this.userService.updateUser(user);
    }

    async patchUser(user: any) {
        this.logger.info('Controller: patchUser', user);
        return await this.userService.patchUser(user);
    }

    async deleteUser(userId: any) {
        this.logger.info('Controller: deleteUser', userId);
        return await this.userService.deleteUser(userId);
    }
}