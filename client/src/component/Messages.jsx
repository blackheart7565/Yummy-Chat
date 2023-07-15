import mgs from '../styles/module/Messages.module.scss';
import React from 'react';
import Message from "./Message";

const Messages = ({messages}) => {
    return (
        <div className={mgs.messages}>
            {
                messages.map(mess =>
                    <Message key={mess.id}>
                        {mess.username} : {mess.message}
                    </Message>
                )
            }
        </div>
    );
};

export default Messages;