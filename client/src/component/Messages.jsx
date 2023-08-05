import mgs from '../styles/module/Messages.module.scss';
import React, {useEffect, useRef} from 'react';
import Message from "./Message";
import {v4 as uuid} from 'uuid'
import {useRedux} from "../hook/redux";

const Messages = () => {
    const {channel, user, message} = useRedux();
    const messagesRef = useRef();
    const isCurrentChannelUser = channel.currentChannel?.users.some(u => u.id === user.currentUser.id)

    useEffect(() => {
        if (channel.currentChannel && isCurrentChannelUser) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [channel.currentChannel]);

    useEffect(() => {
        scrollToBottom();
    }, [message.messages]);

    const scrollToBottom = () => {
        if (messagesRef.current && messagesRef.current.scrollHeight) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    if (!channel.currentChannel) {
        return <div className={mgs.messages}></div>
    }

    return (
        <div
            className={mgs.messages}
            ref={messagesRef}
        >
            {
                message.messages.map(mess =>
                        mess.channelId === channel.currentChannelId && (
                            <Message
                                key={uuid(7)}
                                className={mess.username === user.currentUser.username ? mgs.currentUserMessage : mgs.otherUserMessage}
                            >
                                <div className={mgs.messages__username}>
                                    <div>{mess.nameChannel}</div>
                                    <div>{mess.username}</div>
                                </div>
                                <div>{mess.message}</div>
                            </Message>
                        )
                )
            }
        </div>
    );
};

export default Messages;