import st from '../styles/module/SearchChannel.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import {useDispatch, useSelector} from "react-redux";
import ChannelsItem from "./ChannelsItem";
import ChannelService from "../utils/reducer/service/channelService";
import {v4 as uuid} from "uuid";

const SearchChannel = () => {
    const [search, setSearch] = useState('');
    const allChannels = useSelector(state => state.channel.allChannels);
    const dispatch = useDispatch();

    const handleCurrentChannel = (channelId) => {
        dispatch(
            ChannelService.setCurrentChannel(channelId)
        );
    }

    return (
        <div className={st.searchChannel}>
            <div className={st.searchChannel__inputSection}>
                <MyInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={st.searchChannel__input}
                    placeholder={'Search...'}
                />
            </div>
            <div className={st.searchChannel__resultInput}>
                {
                    allChannels.map(channel => {
                            if (channel.name === search) {
                                return <ChannelsItem
                                    onClick={() => handleCurrentChannel(channel.id)}
                                    key={[channel.id, uuid.v4(5)].join('')}
                                    channel={channel}
                                />
                            }
                        }
                    )
                }
            </div>
        </div>
    );
};

export default SearchChannel;