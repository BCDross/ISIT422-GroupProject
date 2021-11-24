import { connect, disconnect } from "../Config/db.config";
import { ItemModel } from '../Models/ItemModel';
import { APILogger } from '../Logger/apiLogger';

export class ItemRepository {

    private logger: APILogger;

    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getItems() {
        const items = await ItemModel.find({});
        console.log('items:::', items);
        return items;
    }

    async getItemsByProjectId(projectId: any) {
        let items;
        try {
            items = await ItemModel.find({projectId: projectId});
        } catch(err) {
            this.logger.error('Error:' + err);
        }
        return items;
    }

    async createItem(item: any) {
        let data = {};
        try {
            data = await ItemModel.create(item);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateItem(item: any) {
        let data = {};
        try {//might need to add more attributes to this list
            data = await ItemModel.updateOne({_id: item._id},{    
                name: item.name,
                status: item.status,
                priority: item.priority,
                description: item.description,
                type: item.type
            });
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteItem(itemId: any) {
        let data: any = {};
        try {
            data = await ItemModel.deleteOne({_id : itemId});
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }
}