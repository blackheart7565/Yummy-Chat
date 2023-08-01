import ct from '../styles/module/Chat.module.scss';
import React, {useEffect, useRef} from 'react';
import Messages from "../component/Messages";
import Channels from "../component/Channels";
import MenuBar from "../component/MenuBar";
import {connect} from "../utils/websocket/socket-connect";
import {addUserToChannelAPI, fetchAllChannel, fetchOneChannel, fetchUserChannel} from "../http/channelAPI";
import SendMessage from "../component/SendMessage";
import Connect from "../UI/Connect/Connect";
import ChannelService from "../utils/reducer/service/channelService";
import MessageService from "../utils/reducer/service/messageService";
import {useRedux} from "../hook/redux";

const Chat = () => {
    const {dispatch, channel, user} = useRedux();
    const socket = useRef();


    const ConnectUserToChannel = async () => {
        await addUserToChannelAPI(user.currentUser.id, channel.currentChannelId)
            .then(channel =>
                dispatch(
                    ChannelService.addNewChannel(channel)
                )
            );

        await fetchOneChannel(channel.currentChannelId)
            .then(channel =>
                dispatch(
                    ChannelService.addCurrentChannel(channel)
                )
            );
    }

    // Подключение websocket
    useEffect(() => {
        connect({socket, user: user.currentUser})(dispatch);
    }, [connect]);

    // Получение каналов которые пренадлежат пользователю
    useEffect(() => {
        if (user.currentUser) {
            fetchUserChannel(user.currentUser.id)
                .then(channel => dispatch(ChannelService.addNewManyChannel(channel.channels)));
        }
    }, [user.currentUser])

    // При старте получает все каналы всех пользователей
    useEffect(() => {
        fetchAllChannel().then(channels => {
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

    return (
        <div className={ct.chat}>
            <MenuBar
                websocket={socket}
            />
            <Channels/>
            <div className={ct.chat__communication}>
                <Messages/>
                {
                    channel.currentChannel ?
                        channel.currentChannel?.users.some(u => u.id === user.currentUser.id)
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