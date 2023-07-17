import ct from '../styles/module/Chat.module.scss';
import React, {useState} from 'react';
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Channels from "./Channels";
import MenuBar from "./MenuBar";
import Authorization from "./Authorization";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});

    const getMessage = (message) => {
        setMessages(message);
    }

    const getUser = (user) => {
        setUser(user);
    }

    return (
        <div className={ct.chat}>
            <Authorization
                getUser={getUser}
            />
            <MenuBar User={user}/>
            <Channels/>
            <div className={ct.chat__communication}>
                <Messages
                    currentUser={user.username}
                    messages={messages}
                />
                <SendMessage
                    User={user}
                    getMessage={getMessage}
                />
            </div>
        </div>
    );
};

export default Chat;