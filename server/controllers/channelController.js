import {table} from "../model/model.js";
import {ApiError} from "../error/ApiError.js";
import MessageService from "./service/messageService.js";

class ChannelController {

    async create(req, res) {
        let {avatar, name, description, type, userId} = req.body;

        const channel = await table.Channel.create(
            {avatar, name, description, type, userId}
        );

        const user = await table.User.findOne({where: {id: userId}});
        if (!user) {
            ApiError.notFound('Пользователь не найден');
        }
        await user.addChannel(channel);
        await channel.addUser(user);

        const messages = await MessageService.create({
            message: 'Канал создан',
            username: user.username,
            nameChannel: channel.name,
            userId
        });
        await channel.addMessages(messages);

        return res.json(channel);
    }

    async getUserChannel(req, res) {
        const {userId} = req.query;

        const channelsUser = await table.User.findOne(
            {
                where: {id: userId},
                include: table.Channel
            }
        );

        return res.json(channelsUser);
    }

    async connectUserToChannel(req, res) {
        const {userId, channelId} = req.body;

        const user = await table.User.findByPk(userId);
        const channel = await table.Channel.findByPk(channelId);

        await user.addChannel(channel);
        await channel.addUser(user);

        return res.json(channel);
    }

    async getAll(req, res) {
        const channel = await table.Channel.findAll({
            include: [{model: table.Message, as: "messages"}]
        });
        return res.json(channel);
    }

    async getOne(req, res) {
        const {id} = req.params;

        const channel = await table.Channel.findOne(
            {
                where: {id},
                include: [
                    {model: table.Message, as: 'messages'}
                    , {model: table.User}
                ]
            }
        );
        return res.json(channel);
    }
}

export default new ChannelController();