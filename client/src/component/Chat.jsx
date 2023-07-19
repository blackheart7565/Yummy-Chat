import ct from '../styles/module/Chat.module.scss';
import React, {useEffect, useRef} from 'react';
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Channels from "./Channels";
import MenuBar from "./MenuBar";
import Authorization from "./Authorization";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "../utils/socket-connect";

const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();

    const currentChannelId = useSelector(state => state.currentChannelId);
    const currentUser = useSelector(state => state.currentUser);
    const channels = useSelector(state => state.channels);
    const currentChannel = channels.find(channel => channel.id === currentChannelId);

    useEffect(() => {
        connect({socket, currentUser})(dispatch);
    }, [connect]);

    return (
        <div className={ct.chat}>
            <Authorization/>
            <MenuBar
                websocket={socket}
            />
            <Channels/>
            <div className={ct.chat__communication}>
                <Messages/>
                {
                    currentChannel &&
                    <SendMessage
                        websocket={socket}
                    />
                }
            </div>
        </div>
    );
};

export default Chat;