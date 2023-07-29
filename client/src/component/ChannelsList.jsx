import chlslist from '../styles/module/ChannelsList.module.scss';
import React, {useEffect} from 'react';
import ChannelsItem from "./ChannelsItem";
import {useDispatch, useSelector} from "react-redux";
import ChannelService from "../utils/reducer/service/channelService";
import {fetchOneChannel} from "../http/channelAPI";

const ChannelsList = () => {
    const dispatch = useDispatch();
    const channels = useSelector(state => state.channel.channels);
    const currentChannelId = useSelector(state => state.channel.currentChannelId);

    const handleCurrentChannel = (channelId) => {
        dispatch(
            ChannelService.setCurrentChannel(channelId)
        );
    }

    useEffect(() => {
        if (currentChannelId) {
            fetchOneChannel(currentChannelId)
                .then(channel => dispatch(
                    ChannelService.addCurrentChannel(channel)
                ));
        }
    }, [currentChannelId]);

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