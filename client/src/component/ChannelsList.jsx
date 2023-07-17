import chlslist from '../styles/module/ChannelsList.module.scss';
import React from 'react';
import ChannelsItem from "./ChannelsItem";
import {useSelector} from "react-redux";

const ChannelsList = () => {
    const channels = useSelector(state => state.channels);

    console.log(channels)

    return (
        <div className={chlslist.channels__list}>
            {
                channels.map(channel =>
                    <ChannelsItem
                        key={channel.id}
                        channel={channel}
                    />
                )
            }
        </div>
    );
};

export default ChannelsList;