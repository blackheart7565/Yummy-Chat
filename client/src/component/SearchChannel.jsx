import st from '../styles/module/SearchChannel.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import {useDispatch, useSelector} from "react-redux";
import ChannelsItem from "./ChannelsItem";
import {setCurrentChannel} from "../utils/reducer/reducer-service";

const SearchChannel = () => {
    const [search, setSearch] = useState('');
    const channels = useSelector(state => state.channels);
    const allChannels = useSelector(state => state.allChannels);
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    const handleCurrentChannel = (channelId) => {
        dispatch(
            setCurrentChannel(channelId)
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
                                    key={channel.id}
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