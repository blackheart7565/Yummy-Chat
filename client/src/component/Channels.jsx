import chls from '../styles/module/Channels.module.scss';
import React from 'react';
import ChannelsList from "./ChannelsList";
import SearchChannel from "./SearchChannel";

const Channels = () => {
    return (
        <div
            className={chls.channels}
        >
            <SearchChannel/>
            <ChannelsList/>
        </div>
    );
};

export default Channels;