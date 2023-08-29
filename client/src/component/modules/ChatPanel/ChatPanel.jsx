import React, {useEffect, useRef} from 'react';

import Messages from "../Messages/Messages";
import {useRedux} from "../../../hook/redux";
import InfoChannel from "../InfoChannel/InfoChannel";
import SendMessages from "../SendMessages/SendMessages";
import './ChatPanel.css';
import Connect from "../../../UI/Connect/Connect";
import ChannelAPI from "../../../http/channelAPI";
import ChannelService from "../../../utils/reducer/service/channelService";

const ChatPanel = ({websocket, isCurrentChannel}) => {
    const {channel, user, message, dispatch} = useRedux();
    const messagesRef = useRef();

    const scrollToBottom = () => {
        if (messagesRef.current && messagesRef.current?.scrollHeight) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    const ConnectUserToChannel = async () => {
        await ChannelAPI.addUserToChannelAPI(user.currentUser.id, channel.currentChannelId)
            .then(channel =>
                dispatch(
                    ChannelService.addNewChannel(channel)
                )
            );

        await ChannelAPI.fetchOneChannel(channel.currentChannelId)
            .then(channel =>
                dispatch(
                    ChannelService.addCurrentChannel(channel)
                )
            );
    }

    useEffect(() => {
        if (channel.currentChannel && isCurrentChannel) {
            messagesRef.current.scrollTop = messagesRef.current?.scrollHeight;
        }
    }, [channel.currentChannel]);

    useEffect(() => {
        scrollToBottom();
    }, [message.messages]);

    if (!channel.currentChannel) {
        return (
            <section className={'chat-panel'}></section>
        );
    }

    return (
        <section
            className={'chat-panel'}
            id="chat__right"
        >
            <div
                className="chat-panel__wrapper"
            >
                <InfoChannel/>
                <div
                    className="scrollable scrollable-y"
                    ref={messagesRef}
                >
                    <Messages />
                </div>

                {
                    isCurrentChannel ? (
                        <SendMessages
                            websocket={websocket}
                        />
                    ) : (
                        <Connect
                            onClick={ConnectUserToChannel}
                        >
                            Подключится
                        </Connect>
                    )
                }
            </div>
        </section>
    );
};

export default ChatPanel;