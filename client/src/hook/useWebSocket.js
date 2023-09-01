import {useMemo, useRef} from "react";
import MessageService from "../utils/reducer/service/messageService";


/**
 * @param {String} url сылка e ws сервера
 * @param {Object} user обьект пользователя
 * @param dispatch
 * */
const useWebSocket = ({url, user}, dispatch) => {
    const socketRef = useRef(null);

    useMemo(() => {
        if (socketRef.current === null) {
            const ws = new WebSocket(url);

            ws.addEventListener('open', () => {
                if (user && user.username) {
                    const message = {
                        event: 'connecting',
                        username: user.username,
                        id: Date.now(),
                    };

                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify(message));
                    }
                }
            });
            ws.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);

                switch (data.event) {
                    case 'message':
                        dispatch(
                            MessageService.addNewMessage(data.data.channelId, data.data)
                        );
                        break;
                }
            });
            ws.addEventListener('close', (event) => {
                if (event.wasClean) {
                    console.info(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
                } else {
                    console.info('[close] Соединение прервано');
                }
            });
            ws.addEventListener('error', () => {
                console.error('Server error');
            });

            socketRef.current = ws;
        }

        return () => {
            if (socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, [url]);

    return {
        socket: socketRef.current
    };
}

export {
    useWebSocket
};