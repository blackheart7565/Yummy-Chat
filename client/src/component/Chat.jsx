import ct from '../styles/module/Chat.module.scss';
import React, {useEffect, useRef} from 'react';
import Messages from "./Messages";
import Channels from "./Channels";
import MenuBar from "./MenuBar";
import Authorization from "./Authorization";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "../utils/websocket/socket-connect";
import {addUserToChannelAPI, fetchAllChannel, fetchOneChannel, fetchUserChannel} from "../http/channelAPI";
import SendMessage from "./SendMessage";
import Connect from "../UI/Connect/Connect";
import UserService from "../utils/reducer/service/userService";
import ChannelService from "../utils/reducer/service/channelService";
import MessageService from "../utils/reducer/service/messageService";

const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();

    const currentChannelId = useSelector(state => state.channel.currentChannelId);
    const currentUser = useSelector(state => state.user.currentUser);
    const currentChannel = useSelector(state => state.channel.currentChannel);

    const ConnectUserInChannel = async () => {
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

    useEffect(() => {
        connect({socket, currentUser})(dispatch);
    }, [connect]);

    useEffect(() => {
        if (currentUser) {
            fetchUserChannel(currentUser.id)
                .then(channel => dispatch(ChannelService.addNewManyChannel(channel.channels)));
        }
    }, [currentUser])

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
            <Authorization/>
            <MenuBar
                websocket={socket}
            />
            <Channels
                userId={currentUser?.id}
            />
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
                                    onClick={ConnectUserInChannel}
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