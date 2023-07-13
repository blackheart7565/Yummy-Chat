import ct from '../styles/Chat.module.scss';
import React from 'react';
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Channels from "./Channels";
import MenuBar from "./MenuBar";

const Chat = () => {
    return (
        <div className={ct.chat}>
            <MenuBar/>
            <Channels/>
            <div className={ct.chat__communication}>
                <Messages/>
                <SendMessage/>
            </div>
        </div>
    );
};

export default Chat;