import ct from '../styles/module/Chat.module.scss';
import React, {useEffect, useRef} from 'react';
import Messages from "../component/Messages";
import Channels from "../component/Channels";
import {connect} from "../utils/websocket/socket-connect";
import ChannelAPI from "../http/channelAPI";
import SendMessage from "../component/SendMessage";
import Connect from "../UI/Connect/Connect";
import ChannelService from "../utils/reducer/service/channelService";
import MessageService from "../utils/reducer/service/messageService";
import {useRedux} from "../hook/redux";
import ChatInfo from "../component/ChatInfo";

const Chat = () => {
    const {dispatch, channel, user} = useRedux();
    const socket = useRef();
    const isChannel = channel.currentChannel?.users.some(u => u.id === user.currentUser.id);

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
        <div className={ct.chat}>
            <Channels
                websocket={socket}
            />
            <div
                className={ct.chat__communication}
                id={'column-right'}
            >
                {
                    channel.currentChannel ?
                        isChannel && (
                            <ChatInfo/>
                        )
                        :
                        null
                }
                <Messages/>
                {
                    channel.currentChannel ?
                        isChannel
                            ? (
                                <SendMessage
                                    websocket={socket}
                                />
                            )
                            : (
                                <Connect
                                    onClick={ConnectUserToChannel}
                                >
                                    Подключится
                                </Connect>
                            )
                        :
                        null
                }
            </div>
        </div>
    );
};

export default Chat;