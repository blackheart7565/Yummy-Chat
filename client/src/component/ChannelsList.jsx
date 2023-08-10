import chlslist from '../styles/module/ChannelsList.module.scss';
import React, {useEffect} from 'react';
import ChannelsItem from "./ChannelsItem";
import ChannelService from "../utils/reducer/service/channelService";
import ChannelAPI from "../http/channelAPI";
import {nanoid} from "nanoid";
import {Link} from "react-router-dom";
import {CHAT_PATH} from "../utils/const-vars";
import {useRedux} from "../hook/redux";

const ChannelsList = () => {
    const {dispatch, channel} = useRedux();

    const handleCurrentChannel = (channelId) => {
        dispatch(
            ChannelService.setCurrentChannel(channelId)
        );
        document.body.classList.remove('is-left-show');
        dispatch(ChannelService.toggleCloseActive());
    }

    useEffect(() => {
        if (channel.currentChannelId) {
            ChannelAPI.fetchOneChannel(channel.currentChannelId)
                .then(channel =>
                    dispatch(
                        ChannelService.addCurrentChannel(channel)
                    )
                );
        }
    }, [channel.currentChannelId]);

    return (
        <div className={chlslist.channels__list}>
            {
                channel.channels.map(channel =>
                    <Link
                        className={chlslist.channels__link}
                        to={`${CHAT_PATH}${channel.id}`}
                        key={channel.id + nanoid(5)}
                    >
                        <ChannelsItem
                            onClick={() => handleCurrentChannel(channel.id)}
                            channel={channel}
                        />
                    </Link>
                )
            }
        </div>
    );
};

export default ChannelsList;