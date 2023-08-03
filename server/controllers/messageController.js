import MessageService from "./service/messageService.js";
import {ApiError} from "../error/ApiError.js";
import {Channels} from "../model/Channels.js";

class MessageController {

    async create(req, res) {
        const {message, username, nameChannel, userId, channelId} = req.body;

        const messages = await MessageService.create({
            message
            , username
            , nameChannel
            , userId
        });
        const channel = await Channels.findByPk(channelId);
        if(!channel) {
            return ApiError.notFound('Канал не найден');
        }
        await channel.addMessages(messages);

        return res.json(messages);
    }

}

export default new MessageController();