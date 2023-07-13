import React from 'react';

const Message = ({props, children}) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default Message;