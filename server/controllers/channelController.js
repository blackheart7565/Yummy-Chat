import {table} from "../model/model.js";

class ChannelController {

    async create(req, res) {
        const {name, type} = req.body;
        const channel = await table.Channel.create(
            {name, type}
        );
        return res.json(channel);
    }

    async getAll(req, res) {
        const channel = await table.Channel.findAll();
        return res.json(channel);
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        const channel = await table.Channel.findOne(
            {where: {id}}
        );
        return res.json(channel);
    }
}

export default new ChannelController();