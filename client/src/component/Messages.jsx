import mgs from '../styles/Messages.module.scss';
import React from 'react';
import Message from "./Message";

const Messages = () => {
    return (
        <div className={mgs.messages}>
            <Message></Message>
        </div>
    );
};

export default Messages;