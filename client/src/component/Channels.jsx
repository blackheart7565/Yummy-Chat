import chls from '../styles/module/Channels.module.scss';
import React from 'react';
import ChannelsList from "./ChannelsList";

const Channels = ({User}) => {
    return (
        <div
            className={chls.channels}
        >
            <ChannelsList User={User}/>
        </div>
    );
};

export default Channels;