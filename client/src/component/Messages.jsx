import mgs from '../styles/module/Messages.module.scss';
import React from 'react';
import {useSelector} from "react-redux";
import Message from "./Message";

const Messages = () => {
    const currentChannelId = useSelector(state => state.channel.currentChannelId);
    const currentUser = useSelector(state => state.user.currentUser);
    const currentChannel = useSelector(state => state.channel.currentChannel);
    const messages = useSelector(state => state.message.messages);

    if (!currentChannel) {
        return <div className={mgs.messages}></div>
    }

    return (
        <div className={mgs.messages}>
            {
                messages.map(mess =>
                        mess.channelId === currentChannelId && (
                            <Message
                                key={mess.id}
                                className={mess.username === currentUser.username ? mgs.currentUserMessage : mgs.otherUserMessage}
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