import chls from '../styles/module/Channels.module.scss';
import React from 'react';
import ChannelsList from "./ChannelsList";

const Channels = () => {
    return (
        <div
            className={chls.channels}
        >
            <ChannelsList/>
        </div>
    );
};

export default Channels;