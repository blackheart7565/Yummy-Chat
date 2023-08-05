import st from '../styles/module/Channels.module.scss';
import searchSt from '../styles/module/SearchChannel.module.scss'
import React, {useState} from 'react';
import ChannelsList from "./ChannelsList";
import SearchChannel from "./SearchChannel";
import MenuBar from "./MenuBar";
import ChannelsItem from "./ChannelsItem";
import {v4 as uuid} from "uuid";
import {useRedux} from "../hook/redux";
import ChannelService from "../utils/reducer/service/channelService";

const Channels = ({websocket}) => {
    const {dispatch, channel} = useRedux();
    const [search, setSearch] = useState('');

    const handleCurrentChannel = (channelId) => {
        dispatch(
            ChannelService.setCurrentChannel(channelId)
        );
    }

    return (
        <div
            className={st.channels}
        >
            <div className={st.channels__wrapper}>
                <MenuBar
                    websocket={websocket}
                />
                <SearchChannel
                    search={search}
                    setSearch={setSearch}
                />
            </div>

            <div className={searchSt.searchChannel__resultInput}>
                {
                    channel.allChannels.map(channel => {
                            if (channel.name === search) {
                                return <ChannelsItem
                                    onClick={() => handleCurrentChannel(channel.id)}
                                    key={uuid(7)}
                                    channel={channel}
                                />
                            }
                        }
                    )
                }
            </div>


            <ChannelsList/>
        </div>
    );
};

export default Channels;