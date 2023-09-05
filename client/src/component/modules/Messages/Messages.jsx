import React from 'react';
import {v4 as uuid} from "uuid";

import './Messages.css';
import Message from "./Message/Message";
import {useRedux} from "../../../hook/useRedux";
import {nanoid} from "nanoid";

const Messages = () => {
    const {channel, user, message} = useRedux();

    return (
        <section
            className={'messages'}
        >
            {
                message.messages[channel.currentChannel.id].data
                    .sort((a, b) => a.id - b.id)
                    .map(mess =>
                            mess.channelId === channel.currentChannelId && (
                                <Message
                                    key={nanoid(7)}
                                    message={mess.message}
                                    username={mess.username}
                                    isMe={mess.username === user.currentUser.username}
                                />
                            )
                    )
            }
        </section>
    );
};

export default Messages;