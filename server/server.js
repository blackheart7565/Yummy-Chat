import {config} from "dotenv";
config();

import {WebSocketServer} from "ws";
import {broadcastMessage, onSequelize} from "./websocket/ws-service.js";
import {table} from "./model/model.js";

const PORT = process.env.PORT || 5000;

const server = new WebSocketServer({
    port: PORT
})

await onSequelize();


server.on('connection', (socket) => {
    console.log(1)
    socket.on('message', (data) => {
        data = JSON.parse(data);

        switch (data.event) {
            case 'message':
                broadcastMessage(server, data);
                break;

            case 'connecting1':
                broadcastMessage(server, data);
                break;

            case 'channel':
                broadcastMessage(server, data);
                break;
        }
    });
});
