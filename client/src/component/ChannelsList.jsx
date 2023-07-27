import chlslist from '../styles/module/ChannelsList.module.scss';
import React from 'react';
import ChannelsItem from "./ChannelsItem";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentChannel} from "../utils/reducer/reducer-service";

const ChannelsList = () => {
    const dispatch = useDispatch();
    const channels = useSelector(state => state.channels);

    const handleCurrentChannel = (channelId) => {
        dispatch(
            setCurrentChannel(channelId)
        );
    }

    // console.log(messages)

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