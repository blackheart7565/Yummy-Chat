import chlslist from '../styles/module/ChannelsList.module.scss';
import React from 'react';
import ChannelsItem from "./ChannelsItem";

const ChannelsList = () => {
    return (
        <div className={chlslist.channels__list}>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
            <ChannelsItem/>
        </div>
    );
};

export default ChannelsList;