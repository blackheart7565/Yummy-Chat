import mess from '../styles/module/Message.module.scss';
import React from 'react';

const Message = ({children, ...props}) => {
    const classArr = [mess.message, props.className];

    return (
        <div  {...props} className={classArr.join(' ')}>
            <div className={mess.message__inner}>
                {children}
            </div>
        </div>
    );
};

export default Message;