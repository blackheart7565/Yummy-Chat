import React, {useState} from 'react';
import {useRedux} from "../../../hook/redux";
import MessageAPI from "../../../http/messageAPI";

import TextArea from "antd/es/input/TextArea";
import './SendMessages.css';
import {nanoid} from "nanoid";

const SendMessages = ({websocket}) => {
    const [value, setValue] = useState('');
    const {channel, user, message} = useRedux();

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
                    , createdAt: Date.now()
                }
            }

            try {
                if (websocket.readyState === WebSocket.OPEN) {
                    websocket.send(
                        JSON.stringify(messageEvent)
                    );
                    await MessageAPI.createMessage(messageEvent.data);
                }
            } catch (e) {
                console.log(e.message)
            }

            setValue('');
        }
    }

    return (
        <section className='send-message'>
            <div
                data-placeholder='Send messages'
                className='send-message__input'
            >
                <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='send-message__input-wrapper'
                    placeholder='Send message'
                    autoSize
                />
            </div>

            <div
                className="send-message__ico"
                onClick={sendingMessage}
            >
                <img src="/send/send-icon.png" alt="send-message-ico"/>
            </div>
        </section>
    );
};

export default SendMessages;