import {PORT} from "../const-vars";
import MessageService from "../reducer/service/messageService";
import ChannelService from "../reducer/service/channelService";

export const connect = ({socket, user}) => (dispatch) => {
    socket.current = new WebSocket(`ws://localhost:${PORT}`);

    // Событие когда подключились к чату
    socket.current.onopen = () => {
        if (user && user.username) {
            const message = {
                event: 'connecting',
                username: user.username,
                id: Date.now(),
            }

            socket.current.send(
                JSON.stringify(message)
            );
        }
    }

    // Событие когда получили сообшение
    socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.event) {
            case 'message':
                dispatch(
                    MessageService.addNewMessage(data.data)
                )
                break;

            case 'channel':
                dispatch(
                    ChannelService.addChannelInAllChannel(data.channel)
                )
                break;
        }
    }

    // Событие когда соидинение с чатом закрыто
    socket.current.onclose = () => {
        console.log(`Server closed`);
    }

    // Событие когда пройзогла ошибка
    socket.current.onerror = () => {
        console.log(`Server error`);
    }
}