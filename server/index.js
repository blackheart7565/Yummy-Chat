const {WebSocketServer} = require("ws");

const PORT = 7000;

const wss = new WebSocketServer({
    port: PORT
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(message);
        message = JSON.parse(message);

        switch (message.event) {
            case 'message': {
                broadcastMessage(message);
            }
                break;
            case 'connecting1': {
                broadcastMessage(message);
            }
                break;
        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}