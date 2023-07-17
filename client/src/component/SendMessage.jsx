import sendmes from '../styles/module/SendMessage.module.scss';
import React, {useEffect, useRef, useState} from 'react';
import MyTextArea from "../UI/MyTextArea/MyTextArea";
import {PORT, SIZE_HEIGHT_TEXTAREA} from "../utils/globalVars";
import {useDispatch, useSelector} from "react-redux";
import {addNewMessage} from "../utils/reducer-service";

const SendMessage = ({User, getMessage}) => {
    const [value, setValue] = useState('');
    const currentChannelId = useSelector(state => state.currentChannelId);
    const channels = useSelector(state => state.channels);
    const currentChannel = channels.find(channel => channel.id === currentChannelId);
    const dispatch = useDispatch();

    const socket = useRef();
    const textareaRef = useRef();

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
                event: 'connecting',
                username: User.username,
                id: Date.now(),
                // message: `${User.username} connected to channel`
            }

            socket.current.send(
                JSON.stringify(message)
            );
        }

        // Событие когда получили сообшение
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);

            addNewMessage(currentChannelId, message);

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
        if (currentChannel) {
            const message = {
                event: 'message',
                username: User.username,
                message: value,
                id: Date.now(),
            }

            dispatch(
                addNewMessage(currentChannelId, message)
            )

            socket.current.send(JSON.stringify(message));

            setValue('');
            textareaRef.current.style.height = `${SIZE_HEIGHT_TEXTAREA}px`;
        }
    }

    return (
        <div className={sendmes.sendMessage}>
            <MyTextArea
                ref={textareaRef}
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