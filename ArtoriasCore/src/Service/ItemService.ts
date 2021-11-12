import { ItemRepository } from '../Repository/ItemRepository';

export class ItemService {

    private itemRepository: ItemRepository;

    constructor() {
        this.itemRepository = new ItemRepository();
    }

    async getItems() {
        return await this.itemRepository.getItems();
    }

    async createItem(item: any) {
        return await this.itemRepository.createItem(item);
    }

    async updateItem(item: any) {
        return await this.itemRepository.updateItem(item);
    }

    async deleteItem(itemId: any) {
        return await this.itemRepository.deleteItem(itemId);
    }

}