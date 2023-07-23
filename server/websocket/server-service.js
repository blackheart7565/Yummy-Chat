import {sequelize} from '../database/database.js';
import {EXPRESS_PORT} from "../const-vars.js";

export const broadcastMessage = (server, data) => {
    server.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
}

export const onSequelize = async (express) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        express.listen(EXPRESS_PORT, () => console.log(`Express server started on ${EXPRESS_PORT} port`));
    } catch (e) {
        console.log(e.message)
    }
}