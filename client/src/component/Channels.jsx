import chls from '../styles/module/Channels.module.scss';
import React from 'react';
import ChannelsList from "./ChannelsList";
import SearchChannel from "./SearchChannel";

const Channels = ({User}) => {
    return (
        <div
            className={chls.channels}
        >
            <SearchChannel User={User}/>
            <ChannelsList
                User={User}
            />
        </div>
    );
};

export default Channels;