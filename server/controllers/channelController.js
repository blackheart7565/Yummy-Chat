import {table} from "../model/model.js";

class ChannelController {
    async create(req, res) {
        let {avatar, name, description, type, messages} = req.body;

        const channel = await table.Channel.create(
            {avatar, name, description, type}
        );

        if (messages) {
            messages = JSON.parse(messages);
            messages.forEach(item =>
                table.Message.create({
                    message: item.message,
                    userId: item.userId,
                    channelId: channel.id,
                })
            )
        }

        return res.json(channel);
    }

    async getAll(req, res) {
        const channel = await table.Channel.findAll(
            {include: [{model: table.Message, as: "messages"}]}
        );
        return res.json(channel);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const channel = await table.Channel.findOne(
            {
                where: {id},
                include: [{model: table.Message, as: "messages"}]
            }
        );
        return res.json(channel);
    }

    async delete(req, res) {
        const {id} = req.params;
        const channel = table.Channel.findOne({where: {id}});
        return res.json(channel);
    }
}

export default new ChannelController();