import React from 'react';

const ChatPanel = ({isCurrentChannel}) => {

    if(!isCurrentChannel) {
        return (
            <div></div>
        );
    }

    return (
        <div className={'chat-panel'} id="chat__right">
            <div className="chat-panel__wrapper">
                {/*<InfoChannel/>*/}
                {/*<div className="scrollable scrollable-y">*/}
                {/*    <Messages*/}
                {/*        messages={messages}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<SendMessages*/}
                {/*    getMessage={getMessage}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default ChatPanel;