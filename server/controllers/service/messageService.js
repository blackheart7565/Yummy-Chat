import {Messages} from "../../model/Messages.js";


class MessageService {
    async create(message) {
        const messages = await Messages.create(message);
        return messages;
    }
}

export default new MessageService();