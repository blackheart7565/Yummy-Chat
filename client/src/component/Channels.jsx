import chls from '../styles/module/Channels.module.scss';
import React, {useEffect} from 'react';
import ChannelsList from "./ChannelsList";
import SearchChannel from "./SearchChannel";
import {fetchChannel} from "../http/channelAPI";

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