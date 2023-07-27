import {table} from "../model/model.js";
import {model} from "mongoose";

class ChannelController {
    async create(req, res) {
        let {avatar, name, description, type, userId} = req.body;

        const channel = await table.Channel.create(
            {avatar, name, description, type, userId}
        );

        // if (messages) {
        //     // messages = JSON.parse(messages);
        //     messages.forEach(item =>
        //         table.Message.create({
        //             message: item.message,
        //             userId: item.userId,
        //             channelId: channel.id,
        //         })
        //     )
        // }
        const messages = await table.Message.create({
            message: 'Канал создан'
        });
        channel.addMessages(messages);

        await table.User.findOne(
            {
                where: {id: userId},
            }
        ).then(user => {
            user.addChannel(channel);
        })

        return res.json(channel);
    }

    async getAll(req, res) {
        const channels= await table.Channel.findAll({where:{}})
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
                include: [{ model: table.Message, as: 'messages'}]
            }
        );
        return res.json(channel);
    }
}

export default new ChannelController();