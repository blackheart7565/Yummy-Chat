import mgs from '../styles/module/Messages.module.scss';
import React from 'react';
import Message from "./Message";
import {v4 as uuid} from 'uuid'
import {useRedux} from "../hook/redux";

const Messages = () => {
    const {channel, user, message} = useRedux();

    if (!channel.currentChannel) {
        return <div className={mgs.messages}></div>
    }

    return (
        <div className={mgs.messages}>
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