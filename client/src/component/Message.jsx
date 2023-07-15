import React from 'react';

const Message = ({children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default Message;