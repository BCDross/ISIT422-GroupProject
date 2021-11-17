import { connect, disconnect } from "../Config/db.config";
import { UserModel } from '../Models/UserModel';
import { APILogger } from '../Logger/apiLogger';

export class UserRepository {

    private logger: APILogger;

    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getUsers() {
        const users = await UserModel.find({});
        console.log('users:::', users);
        return users;
    }

    async createUser(user: any) {
        let data = {};
        try {
            data = await UserModel.create(user);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateUser(user: any) {
        let data = {};
        try {
            data = await UserModel.updateOne(user);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async patchUser(user: any) {
        let data = {};
        try {
            data = await UserModel.updateOne(user);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteUser(userId: any) {
        let data: any = {};
        try {
            data = await UserModel.deleteOne({_id : userId});
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }
}