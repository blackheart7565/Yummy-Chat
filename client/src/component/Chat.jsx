import ct from '../styles/module/Chat.module.scss';
import React, {useEffect, useRef, useState} from 'react';
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Channels from "./Channels";
import MenuBar from "./MenuBar";
import Authorization from "./Authorization";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "../utils/socket-connect";
import {addNewChannel} from "../utils/reducer-service";

const Chat = () => {
    const [user, setUser] = useState({});

    const currentChannelId = useSelector(state => state.currentChannelId);
    const channels = useSelector(state => state.channels);
    const currentChannel = channels.find(channel => channel.id === currentChannelId);
    const socket = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        connect({socket, currentChannelId, user})(dispatch);
    }, [connect]);

    const getUser = (user) => {
        setUser(user);
    }

    const handleNewChannel = (channel) => {
        const channels = {
            event: 'new_channel',
            channel: {
                ...channel,
                usernameUser: user.username,
                phoneUser: user.phone,
            },
        };

        dispatch(addNewChannel(channel));
        socket.current.send(JSON.stringify(channels));
    };

    return (
        <div className={ct.chat}>
            <Authorization
                getUser={getUser}
            />
            <MenuBar
                onNewChannel={handleNewChannel}
                websocket={socket}
                User={user}
            />
            <Channels/>
            <div className={ct.chat__communication}>
                <Messages
                    currentUser={user.username}
                />
                {
                    currentChannel &&
                    <SendMessage
                        websocket={socket}
                        User={user}
                    />
                }
            </div>
        </div>
    );
};

export default Chat;