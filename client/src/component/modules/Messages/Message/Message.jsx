import React from 'react';

import './Message.css';

const Message = ({isMe, message, date, username}) => {

    return (
        <div className={`message ${isMe ? `message__isme` : ''}`}>
            <div className="message__avatar">
                <img
                    src="https://images.pexels.com/photos/15936673/pexels-photo-15936673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt={`${username} avatar`}
                />
            </div>
            <div className="message__content">
                <p className="message__text">{message}</p>
                <div className="message__date">
                    <span>15:57</span>
                </div>
            </div>
        </div>
    );
};

export default Message;