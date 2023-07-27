import {table} from "../model/model.js";
import {ApiError} from "../error/ApiError.js";

class ChannelController {

    async create(req, res) {
        let {avatar, name, description, type, userId} = req.body;

        const channel = await table.Channel.create(
            {avatar, name, description, type, userId}
        );

        const user = await table.User.findOne({where: {id: userId}});
        if(!user) {
            ApiError.notFound('Пользователь не найден');
        }
        await user.addChannel(channel);

        const messages = await table.Message.create({
            message: 'Канал создан',
            username: user.username,
            nameChannel: channel.name,
            userId
        });
        channel.addMessages(messages);

        return res.json(channel);
    }

    async getAll(req, res) {
        const channels = await table.Channel.findAll({where: {}})
        return res.json(channels);
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

    async getOne(req, res) {
        const {id} = req.params;

        const channel = await table.Channel.findOne(
            {
                where: {id},
                include: [{model: table.Message, as: 'messages'}]
            }
        );
        return res.json(channel);
    }
}

export default new ChannelController();