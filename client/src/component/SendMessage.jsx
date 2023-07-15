import sendmes from '../styles/module/SendMessage.module.scss';
import React, {useEffect, useRef, useState} from 'react';
import MyTextArea from "../UI/MyTextArea/MyTextArea";
import {PORT, SIZE_HEIGHT_TEXTAREA} from "../utils/globalVars";

const SendMessage = ({User, getMessage}) => {
    const [value, setValue] = useState('');
    const socket = useRef();

    useEffect(() => {
        connect();
    }, [])

    const changeSizeInput = (e) => {
        setValue(e.target.innerHTML);
        e.target.style.height = `${e.target.scrollHeight + 2}px`;

        if (e.target.value === '') {
            e.target.style.height = `${SIZE_HEIGHT_TEXTAREA}px`;
        }
    }

    const connect = () => {
        socket.current = new WebSocket(`ws://localhost:${PORT}`);

        // Событие когда подключились к чату
        socket.current.onopen = () => {
            const message = {
                event: 'connection',
                username: User.username,
                id: Date.now(),
            }

            socket.current.send(
                JSON.stringify(message)
            );
        }

        // Событие когда получили сообшение
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            getMessage(prev => [...prev, message]);
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

    const sendingMessage = () => {

        const message = {
            event: 'message',
            username: User.username,
            message: value,
            id: Date.now(),
        }
        socket.current.send(JSON.stringify(message));
    }

    return (
        <div className={sendmes.sendMessage}>
            <MyTextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onInput={changeSizeInput}
                className={sendmes.sendMessage__text}
                placeholder='Send message'
            />
            <div
                className={sendmes.sendMessage__sendBtn}
                onClick={sendingMessage}
            />
        </div>
    );
};

export default SendMessage;