import {ApiError} from "../error/ApiError.js";
import MessageService from "./service/messageService.js";
import {Messages} from "../model/Messages.js";
import {Users} from "../model/Users.js";
import {Channels} from "../model/Channels.js";

class ChannelController {

    async create(req, res) {
        let {avatar, name, description, type, userId} = req.body;

        const channel = await Channels.create(
            {avatar, name, description, type, userId}
        );

        const user = await Users.findOne({where: {id: userId}});
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

        const channelsUser = await Users.findOne(
            {
                where: {id: userId},
                include: Channels
            }
        );

        return res.json(channelsUser);
    }

    async connectUserToChannel(req, res) {
        const {userId, channelId} = req.body;

        const user = await Users.findByPk(userId);
        const channel = await Channels.findByPk(channelId);

        await user.addChannel(channel);
        await channel.addUser(user);

        return res.json(channel);
    }

    async getAll(req, res) {
        const channel = await Channels.findAll({
            include: [
                {model: Messages, as: "messages"}
                , {model: Users}
            ]
        });
        return res.json(channel);
    }

    async getOne(req, res) {
        const {id} = req.params;
        let {page, limit} = req.query;

        const channel = await Channels.findOne(
            {
                where: {id},
                include: [
                    {
                        model: Messages
                        , as: 'messages'
                        , limit: limit
                        , offset: page * limit
                        , order: [
                            ['createdAt', 'DESC']
                        ]
                    }
                    , {model: Users}
                ]
            }
        );
        return res.json(channel);
    }
}

export default new ChannelController();