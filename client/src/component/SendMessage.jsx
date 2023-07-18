import sendmes from '../styles/module/SendMessage.module.scss';
import React, {useRef, useState} from 'react';
import MyTextArea from "../UI/MyTextArea/MyTextArea";
import {SIZE_HEIGHT_TEXTAREA} from "../utils/globalVars";
import {useSelector} from "react-redux";

const SendMessage = ({User, websocket}) => {
    const [value, setValue] = useState('');
    const currentChannelId = useSelector(state => state.currentChannelId);
    const channels = useSelector(state => state.channels);
    const currentChannel = channels.find(channel => channel.id === currentChannelId);
    const textareaRef = useRef();

    const changeSizeInput = (e) => {
        setValue(e.target.innerHTML);
        e.target.style.height = `${e.target.scrollHeight + 2}px`;

        if (e.target.value === '') {
            e.target.style.height = `${SIZE_HEIGHT_TEXTAREA}px`;
        }
    }

    const sendingMessage = () => {
        if (currentChannel) {
            const message = {
                id: Date.now(),
                username: User.username,
                message: value,
                currentChannelId
            }
            const messageEvent = {
                event: 'message',
                message
            }

            websocket.current.send(JSON.stringify(messageEvent));

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