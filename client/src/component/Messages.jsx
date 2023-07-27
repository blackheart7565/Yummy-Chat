import mgs from '../styles/module/Messages.module.scss';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {fetchOneChannel} from "../http/channelAPI";
import Message from "./Message";

const Messages = () => {
    const channels = useSelector(state => state.channels);
    const currentChannelId = useSelector(state => state.currentChannelId);
    const currentUser = useSelector(state => state.currentUser);
    const [currentChannel, setCurrentChannel] = useState(null);

    useEffect(() => {
        fetchOneChannel(7)
            .then(channel => setCurrentChannel(channel));
    }, [])

    if (!currentChannel) {
        return <div className={mgs.messages}></div>
    }

    return (
        <div className={mgs.messages}>
            {/*{*/}
            {/*    currentChannel.messages.map(mess =>*/}
            {/*        <Message*/}
            {/*            key={mess.id}*/}
            {/*            // className={mess.username === currentUser.username ? mgs.currentUserMessage : mgs.otherUserMessage}*/}
            {/*        >*/}
            {/*            /!*<div className={mgs.messages__username}>*!/*/}
            {/*            /!*    {mess.username}*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            <div>{mess.message}</div>*/}
            {/*        </Message>*/}
            {/*    )*/}
            {/*}*/}
            {
                currentChannel.messages.map(mess =>
                    <Message
                        key={mess.id}
                    >
                        <div>{mess.message}</div>
                    </Message>
                )
            }
        </div>
    );
};

export default Messages;