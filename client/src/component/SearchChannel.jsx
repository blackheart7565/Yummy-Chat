import st from '../styles/module/SearchChannel.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import ChannelsItem from "./ChannelsItem";
import ChannelService from "../utils/reducer/service/channelService";
import {v4 as uuid} from 'uuid'
import {useRedux} from "../hook/redux";

const SearchChannel = () => {
    const [search, setSearch] = useState('');
    const {dispatch, channel} = useRedux();

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
        </div>
    );
};

export default SearchChannel;