import chlslist from '../styles/module/ChannelsList.module.scss';
import React from 'react';
import ChannelsItem from "./ChannelsItem";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentChannel} from "../utils/reducer-service";

const ChannelsList = ({User}) => {
    const dispatch = useDispatch();
    const channels = useSelector(state => state.channels);

    const handleCurrentChannel = (channelId) => {
        dispatch(
            setCurrentChannel(channelId)
        );
    }

    const userChannels = channels.filter(channel =>
        channel.users.some(user => user.id === User.id)
    );
    console.log(userChannels)

    return (
        <div className={chlslist.channels__list}>
            {
                userChannels.map(channel =>
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