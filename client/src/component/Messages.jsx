import mgs from '../styles/module/Messages.module.scss';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneChannel} from "../http/channelAPI";
import Message from "./Message";
import {addCurrentChannel} from "../utils/reducer/reducer-service";

const Messages = () => {
    const currentChannelId = useSelector(state => state.currentChannelId);
    const currentUser = useSelector(state => state.currentUser);
    const currentChannel = useSelector(state => state.currentChannel);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentChannelId) {
            fetchOneChannel(currentChannelId)
                .then(channel => dispatch(
                    addCurrentChannel(channel)
                ));
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