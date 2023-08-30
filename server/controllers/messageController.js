import MessageService from "./service/messageService.js";
import {ApiError} from "../error/ApiError.js";
import {Channels} from "../model/Channels.js";
import {Messages} from "../model/Messages.js";

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
        if (!channel) {
            return ApiError.notFound('Канал не найден');
        }
        await channel.addMessages(messages);

        return res.json(messages);
    }

    async all(req, res) {
        const {channelId, olderMessageId} = req.query;

        const messages = await Messages.findAll({
            where: {
                channelId: channelId,
            },
            order: [['createdAt', 'DESC']],
            limit: 30
        })

        console.log(
            messages
        )






        return res.json(messages);
    }

}

export default new MessageController();