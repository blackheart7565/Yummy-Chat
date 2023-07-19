import st from '../styles/module/SearchChannel.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import {useDispatch, useSelector} from "react-redux";
import ChannelsItem from "./ChannelsItem";
import {setCurrentChannel} from "../utils/reducer-service";

const SearchChannel = ({User}) => {
    const [search, setSearch] = useState('');
    const channels = useSelector(state => state.channels);
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
                    channels.map(channel => {
                            if (channel.displayNameChannel === search && !channel.users.some(user => user.id === User.id)) {
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