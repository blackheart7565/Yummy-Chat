import ct from '../styles/module/Chat.module.scss';
import React, {useEffect, useRef, useState} from 'react';
import Messages from "./Messages";
import Channels from "./Channels";
import MenuBar from "./MenuBar";
import Authorization from "./Authorization";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "../utils/websocket/socket-connect";
import {addNewManyChannel, addUserInChannel, getAllChannel} from "../utils/reducer/reducer-service";
import {fetchAllChannel, fetchUserChannel} from "../http/channelAPI";
import SendMessage from "./SendMessage";
import Connect from "../UI/Connect/Connect";

const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();

    const currentChannelId = useSelector(state => state.currentChannelId);
    const currentUser = useSelector(state => state.currentUser);
    const currentChannel = useSelector(state => state.currentChannel);

    const ConnectUserInChannel = () => {
        dispatch(
            addUserInChannel(currentChannelId, {
                id: currentUser.id
                , phoneUser: currentUser.phone
                , usernameUser: currentUser.username
            })
        );
    }

    useEffect(() => {
        connect({socket, currentUser})(dispatch);
    }, [connect]);

    useEffect(() => {
        if (currentUser) {
            fetchUserChannel(currentUser.id)
                .then(channel => dispatch(addNewManyChannel(channel.channels)));
        }
    }, [currentUser])

    useEffect(() => {
        fetchAllChannel().then(channels => dispatch(
            getAllChannel(channels)
        ))
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