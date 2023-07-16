import mgs from '../styles/module/Messages.module.scss';
import React from 'react';
import Message from "./Message";

const Messages = ({messages, currentUser}) => {
    return (
        <div className={mgs.messages}>
            {
                messages.map(mess =>
                    <Message
                        key={mess.id}
                        className={mess.username === currentUser ? mgs.currentUserMessage : mgs.otherUserMessage}
                    >
                        <div className={mgs.messages__username}>
                            {mess.username}
                        </div>
                        <div>{mess.message}</div>
                    </Message>
                )
            }
        </div>
    );
};

export default Messages;