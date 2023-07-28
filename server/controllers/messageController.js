import MessageService from "./service/messageService.js";
import {table} from "../model/model.js";
import {ApiError} from "../error/ApiError.js";


class MessageController {

    async create(req, res) {
        const {message, username, nameChannel, userId, channelId} = req.query;

        const messages = await MessageService.create({
            message
            , username
            , nameChannel
            , userId
        });
        const channel = await table.Channel.findByPk(channelId);
        if(!channel) {
            return ApiError.notFound('Канал не найден');
        }
        await channel.addMessages(messages);

        return res.json(messages);
    }

}

export default new MessageController();