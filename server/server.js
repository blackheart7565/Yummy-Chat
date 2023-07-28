import {config} from "dotenv";
config();

import {WebSocketServer} from "ws";
import {broadcastMessage, onSequelize} from "./websocket/server-service.js";
import {WS_PORT} from "./const-vars.js";
import {table} from "./model/model.js";
import express from 'express';
import cors from 'cors';
import {errorHandler} from "./middleware/ErrorHandlerMidleware.js";
import {router} from "./routers/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const server = new WebSocketServer({
    port: WS_PORT
});

await onSequelize(app);

server.on('connection', (socket) => {
    socket.on('message', (data) => {
        data = JSON.parse(data);
        console.log(data)

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
