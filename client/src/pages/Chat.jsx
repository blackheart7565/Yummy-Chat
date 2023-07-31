import ct from '../styles/module/Chat.module.scss';
import React, {useEffect, useRef} from 'react';
import Messages from "../component/Messages";
import Channels from "../component/Channels";
import MenuBar from "../component/MenuBar";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "../utils/websocket/socket-connect";
import {addUserToChannelAPI, fetchAllChannel, fetchOneChannel, fetchUserChannel} from "../http/channelAPI";
import SendMessage from "../component/SendMessage";
import Connect from "../UI/Connect/Connect";
import ChannelService from "../utils/reducer/service/channelService";
import MessageService from "../utils/reducer/service/messageService";

const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();

    const currentChannelId = useSelector(state => state.channel.currentChannelId);
    const currentUser = useSelector(state => state.user.currentUser);
    const currentChannel = useSelector(state => state.channel.currentChannel);

    const ConnectUserToChannel = async () => {
        await addUserToChannelAPI(currentUser.id, currentChannelId)
            .then(channel =>
                dispatch(
                    ChannelService.addNewChannel(channel)
                )
            );

        await fetchOneChannel(currentChannelId)
            .then(channel =>
            dispatch(
                ChannelService.addCurrentChannel(channel)
            )
        );
    }

    // Подключение websocket
    useEffect(() => {
        connect({socket, currentUser})(dispatch);
    }, [connect]);

    // Получение каналов которые пренадлежат пользователю
    useEffect(() => {
        if (currentUser) {
            fetchUserChannel(currentUser.id)
                .then(channel => dispatch(ChannelService.addNewManyChannel(channel.channels)));
        }
    }, [currentUser])

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
    }, [])

    return (
        <div className={ct.chat}>
            <MenuBar
                websocket={socket}
            />
            <Channels />
            <div className={ct.chat__communication}>
                <Messages/>
                {
                    currentChannel ?
                        currentChannel?.users.some(user => user.id === currentUser.id)
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