import {sequelize} from '../database/database.js';

export const broadcastMessage = (server, data) => {
    server.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
}

export const onSequelize = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log(e.message)
    }
}