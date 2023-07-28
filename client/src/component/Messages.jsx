import mgs from '../styles/module/Messages.module.scss';
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {fetchOneChannel} from "../http/channelAPI";
import Message from "./Message";

const Messages = ({currentChannel, setCurrentChannel}) => {
    const currentChannelId = useSelector(state => state.currentChannelId);
    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        if (currentChannelId) {
            fetchOneChannel(currentChannelId)
                .then(channel => setCurrentChannel(channel));
        }
    }, [currentChannelId]);

    if (!currentChannel) {
        return <div className={mgs.messages}></div>
    }

    return (
        <div className={mgs.messages}>
            {
                currentChannel.messages.map(mess =>
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
            }
        </div>
    );
};

export default Messages;