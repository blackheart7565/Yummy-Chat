import sendmes from '../styles/SendMessage.module.scss';
import React, {useState} from 'react';
import MyTextArea from "../UI/MyTextArea/MyTextArea";
import {SIZE_TEXTAREA} from "../utils/globalVars";

const SendMessage = () => {
    const [message, setMessage] = useState('');

    const changeSizeInput = (e) => {
        setMessage(e.target.innerHTML);
        e.target.style.height = `${e.target.scrollHeight + 2}px`;

        if (e.target.value === '') {
            e.target.style.height = `${SIZE_TEXTAREA}px`;
        }
    }

    return (
        <div className={sendmes.sendMessage}>
            <MyTextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onInput={changeSizeInput}
                className={sendmes.sendMessage__text}
                placeholder='Send message'
            />
            <div
                className={sendmes.sendMessage__sendBtn}
            />
        </div>
    );
};

export default SendMessage;