import chlslist from '../styles/module/ChannelsList.module.scss';
import React from 'react';
import ChannelsItem from "./ChannelsItem";
import {useDispatch, useSelector} from "react-redux";
import ChannelService from "../utils/reducer/service/channelService";

const ChannelsList = () => {
    const dispatch = useDispatch();
    const channels = useSelector(state => state.channel.channels);

    const handleCurrentChannel = (channelId) => {
        dispatch(
            ChannelService.setCurrentChannel(channelId)
        );
    }

    return (
        <div className={chlslist.channels__list}>
            {
                channels.map(channel =>
                    <ChannelsItem
                        onClick={() => handleCurrentChannel(channel.id)}
                        key={channel.id}
                        channel={channel}
                    />
                )
            }
        </div>
    );
};

export default ChannelsList;