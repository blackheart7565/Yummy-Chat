import React, {useEffect, useRef, useState} from 'react';

import Messages from "../Messages/Messages";
import {useRedux} from "../../../hook/useRedux";
import InfoChannel from "../InfoChannel/InfoChannel";
import SendMessages from "../SendMessages/SendMessages";
import './ChatPanel.css';
import Connect from "../../../UI/Connect/Connect";
import ChannelAPI from "../../../http/channelAPI";
import ChannelService from "../../../utils/reducer/service/channelService";
import MessageService from "../../../utils/reducer/service/messageService";

const ChatPanel = ({websocket, isCurrentChannel}) => {
    const [countPage, setCountPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const {channel, user, message, dispatch, setDispatch} = useRedux();
    const messagesRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesRef.current && messagesRef.current?.scrollHeight) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    const handlerScroll = (e) => {
        if (e.target.scrollTop === 0) {
            console.log(`fetching`)
            setIsFetching(true);
        }
    }

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
        // if (channel.currentChannel && isCurrentChannel) {
        //     console.log(`current channel`)
        //     scrollToBottom();
        // }
        // setCountPage(1);
    }, [channel.currentChannel, isCurrentChannel]);

    // useEffect(() => {
    //     scrollToBottom();
    // }, [message.messages]);

    useEffect(() => {
        if (isFetching) {
            ChannelAPI.fetchOneChannel(channel.currentChannelId, message.messages[channel.currentChannelId].page)
                .then(channelF => {
                        dispatch(
                            MessageService.messagePagination(channel.currentChannelId, channelF.messages)
                        );
                        setDispatch(
                            MessageService.setPageMessage(channel.currentChannelId, message.messages[channel.currentChannelId].page + 1)
                        )
                    }
                )
                .finally(() => setIsFetching(false));
        }
    }, [isFetching]);


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
                    onScroll={handlerScroll}
                >
                    <Messages/>
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