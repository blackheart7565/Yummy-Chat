import React, {useEffect, useRef} from 'react';

import Messages from "../Messages/Messages";
import {useRedux} from "../../../hook/redux";
import InfoChannel from "../InfoChannel/InfoChannel";
import SendMessages from "../SendMessages/SendMessages";
import './ChatPanel.css';

const ChatPanel = ({websocket, isCurrentChannel}) => {
    const {channel, user, message} = useRedux();
    const messagesRef = useRef();

    const scrollToBottom = () => {
        if (messagesRef.current && messagesRef.current?.scrollHeight) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (channel.currentChannel && isCurrentChannel) {
            messagesRef.current.scrollTop = messagesRef.current?.scrollHeight;
        }
    }, [channel.currentChannel]);

    useEffect(() => {
        scrollToBottom();
    }, [message.messages]);

    if (!isCurrentChannel) {
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
                <SendMessages
                    websocket={websocket}
                />
            </div>
        </section>
    );
};

export default ChatPanel;