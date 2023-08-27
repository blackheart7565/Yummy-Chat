import React, {useEffect, useRef} from 'react';
import Channels from "../../../component/modules/Channels/Channels";

import {connect} from "../../../utils/websocket/socket-connect";
import ChannelAPI from "../../../http/channelAPI";
import ChannelService from "../../../utils/reducer/service/channelService";
import MessageService from "../../../utils/reducer/service/messageService";
import {useRedux} from "../../../hook/redux";
import './Chat.css';
import ChatPanel from "../../../component/modules/ChatPanel/ChatPanel";
import CreateChannel from "../../../component/modules/windows/CreateChannel/CreateChannel";

const Chat = () => {
    const {dispatch, channel, user} = useRedux();
    const socket = useRef();
    const isCurrentChannel = channel.currentChannel?.users.some(u => u.id === user.currentUser.id);

    // Подключение websocket
    useEffect(() => {
        connect({socket, user: user.currentUser})(dispatch);
    }, []);

    // Получение каналов которые пренадлежат пользователю
    useEffect(() => {
        ChannelAPI.fetchUserChannel(user.currentUser.id)
            .then(channel =>
                dispatch(
                    ChannelService.addNewManyChannel(channel.channels)
                )
            );
    }, []);

    // При старте получает все каналы всех пользователей
    useEffect(() => {
        ChannelAPI.fetchAllChannel().then(channels => {
                dispatch(
                    ChannelService.getAllChannel(channels)
                )
                channels.forEach(channel => {
                        dispatch(
                            MessageService.addManyMessage(channel.messages)
                        )
                    }
                )
            }
        )
    }, []);

    useEffect(() => {
        document.body.classList.add('is-left-show');
    }, []);

    return (
        <div className={'chat'}>
            <Channels/>
            <ChatPanel
                websocket={socket}
                isCurrentChannel={isCurrentChannel}
            />
        </div>
    );
};

export default Chat;