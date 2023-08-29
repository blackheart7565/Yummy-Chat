import React from 'react';

import st from './Search.module.scss';
import ChannelAPI from "../../../../http/channelAPI";
import {useRedux} from "../../../../hook/redux";

const Search = (
    {
        value
        , setValue
        , channelsCallback
        , ...props
    }) => {
    const {user} = useRedux();

    const rootClasses = [st.search];

    const change = async (e) => {
        const value = e.target.value;
        setValue(value);
        await fetchSearchChannels(value)
            .then(channelsFetch => channelsCallback(channelsFetch));
    }

    const fetchSearchChannels = async (value) => {
        const type = 'public';
        const channels = await ChannelAPI.fetchAllChannel();

        return channels.filter(channel =>
            channel.name.toLowerCase().includes(value.toLowerCase()) &&
            channel.type === type &&
            !channel.users.find(u =>  u.id === user.currentUser.id)
        );
    }



    return (
        <div
            {...props}
            className={rootClasses.join(' ')}
        >
            <input
                className={st.searchInput}
                type="text"
                placeholder={'Search...'}
                value={value}
                onChange={change}
            />
            <button
                className={st.searchBtn}
            >
                <img
                    className={st.searchIco}
                    src={`/search/search-dark.png`}
                    alt="search-ico"
                />
            </button>
        </div>
    );
};

export default Search;