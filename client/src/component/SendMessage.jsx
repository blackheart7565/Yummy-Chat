import sendmes from '../styles/module/SendMessage.module.scss';
import React, {useRef, useState} from 'react';
import MyTextArea from "../UI/MyTextArea/MyTextArea";
import {SIZE_HEIGHT_TEXTAREA} from "../utils/const-vars";
import {createMessage} from "../http/messageAPI";
import {useRedux} from "../hook/redux";

const SendMessage = ({websocket}) => {
    const [value, setValue] = useState('');
    const {channel, user} = useRedux();
    const textareaRef = useRef();

    const changeSizeInput = (e) => {
        setValue(e.target.innerHTML);
        e.target.style.height = `${e.target.scrollHeight + 2}px`;

        if (e.target.value === '') {
            e.target.style.height = `${SIZE_HEIGHT_TEXTAREA}px`;
        }
    }

    const sendingMessage = async () => {
        if (channel.currentChannel) {
            const messageEvent = {
                event: 'message',
                data: {
                    message: value
                    , username: user.currentUser.username
                    , nameChannel: channel.currentChannel.name
                    , userId: user.currentUser.id
                    , channelId: channel.currentChannel.id
                }
            }

            try {
                websocket.current.send(
                    JSON.stringify(messageEvent)
                );

                await createMessage(messageEvent.data);
            } catch (e) {
                console.log(e.message)
            }

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