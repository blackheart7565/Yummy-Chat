const {WebSocketServer} = require("ws");

const PORT = 7000;

const server = new WebSocketServer({
    port: PORT
});

server.on('connection', (socket) => {

    socket.on('message', (data) => {
        data = JSON.parse(data);

        switch (data.event) {
            case 'message':
                broadcastMessage(data);
                break;

            case 'connecting1':
                broadcastMessage(data);
                break;

            case 'channel':
                broadcastMessage(data);
                break;
        }
    });
});

function broadcastMessage(data) {
    server.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
}