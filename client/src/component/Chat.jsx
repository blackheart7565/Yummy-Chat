import ct from '../styles/module/Chat.module.scss';
import React, {useState} from 'react';
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Channels from "./Channels";
import MenuBar from "./MenuBar";
import Authorization from "./Authorization";

const Chat = () => {
    const [isConnection, setIsConnection] = useState(false);

    return (
        <div className={ct.chat}>
            <Authorization/>
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