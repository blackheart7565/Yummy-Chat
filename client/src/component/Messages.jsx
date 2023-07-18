import mgs from '../styles/module/Messages.module.scss';
import React from 'react';
import Message from "./Message";
import {useSelector} from "react-redux";

const Messages = ({currentUser}) => {
    const channels = useSelector(state => state.channels);
    const currentChannelId = useSelector(state => state.currentChannelId);

    const currentChannel = channels.find(channel => channel.id === currentChannelId);

    if(!currentChannel) {
        return <div className={mgs.messages}></div>
    }

    return (
        <div className={mgs.messages}>
            {
                currentChannel.messages.map(mess =>
                    <Message
                        key={mess.id}
                        className={mess.username === currentUser ? mgs.currentUserMessage : mgs.otherUserMessage}
                    >
                        <div className={mgs.messages__username}>
                            {mess.username}
                        </div>
                        <div>{mess.message}</div>
                    </Message>
                )
            }
        </div>
    );
};

export default Messages;