import {table} from "../../model/model.js";

class MessageService {

    async create(message) {
        const messages = await table.Message.create(message);
        return messages;
    }
}

export default new MessageService();