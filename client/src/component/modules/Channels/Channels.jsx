import React, {useEffect, useState} from 'react';
import {useRedux} from "../../../hook/useRedux";
import {Link} from "react-router-dom";

import {CHAT_PATH} from "../../../utils/const-vars";
import ChannelService from "../../../utils/reducer/service/channelService";
import ChannelAPI from "../../../http/channelAPI";
import {nanoid} from "nanoid";
import NavigationPanel from "./NavigationPanel/NavigationPanel";
import st from './Channels.module.scss';
import Search from "./Search/Search";
import MessageService from "../../../utils/reducer/service/messageService";


const Channels = (
        {
            isVisible
            , setIsVisible
        }) => {
        const {dispatch, channel, message} = useRedux();
        const [currentChannelItem, setCurrentChannelItem] = useState(null);
        const [isHideChannel, setIsHideChannel] = useState(false);
        const [filterChannelItem, setFilterChannelItem] = useState('');
        const [globalChannels, setGlobalChannel] = useState([]);

        const rootClasses = [st.channels];

        if (isHideChannel) {
            rootClasses.push(st.active__hideChannel);
        }

        const handleCurrentChannel = (channelId, index) => {
            dispatch(
                ChannelService.setCurrentChannel(channelId)
            );
            document.body.classList.remove('is-left-show');
            dispatch(ChannelService.toggleCloseActive());

            setCurrentChannelItem(index);
        }

        const findGlobalChannels = (channels) => {
            setGlobalChannel(channels);
        }

        const fetchDataChannel = async () => {
            const fetchChannel = await ChannelAPI.fetchOneChannel(channel.currentChannelId)

            // if(!message.messages[channel.currentChannelId]?.isBlockLoadMess) {
            //     console.log(`loading`)
            // }
            dispatch(
                MessageService.loadingMessageToCurrentChannel(fetchChannel.id, fetchChannel.messages)
            );
            dispatch(
                ChannelService.addCurrentChannel(fetchChannel)
            );
        }

        useEffect(() => {
            if (channel.currentChannelId) {
                fetchDataChannel().catch(err => console.error(err));
            }
        }, [channel.currentChannelId]);

        return (
            <section
                className={rootClasses.join(' ')}
                id={'chat__left'}
            >
                <NavigationPanel
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    isHideChannel={isHideChannel}
                    setIsHideChannel={setIsHideChannel}
                />
                <Search
                    value={filterChannelItem}
                    setValue={setFilterChannelItem}
                    channelsCallback={findGlobalChannels}
                />
                <ul
                    className={[st.channels__list, st.channels__listScroll].join(' ')}
                >
                    {
                        channel.channels.filter(channel =>
                            channel.name.toLowerCase().includes(filterChannelItem.toLowerCase())
                        ).map((channel, index) =>
                            <Link
                                key={nanoid(9)}
                                className={
                                    [
                                        st.channels__link
                                        , currentChannelItem === index ? st.activeCurrentChannel : ''
                                    ].join(' ')}
                                to={`${CHAT_PATH}${channel.id}`}
                            >
                                <div
                                    className={st.channels__linkWrapper}
                                    onClick={() => handleCurrentChannel(channel.id, index)}
                                >
                                    <div
                                        className={st.channels__linkLeft}
                                    >
                                        <img
                                            className={st.channels__avatar}
                                            src="https://images.pexels.com/photos/17827719/pexels-photo-17827719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                            alt="channel-avatar"
                                        />
                                    </div>
                                    <div
                                        className={st.channels__linkRight}
                                    >
                                        <h2 className={st.channels__name}>
                                            {channel.name}
                                        </h2>
                                        <div className={st.channels__description}>
                                            <h4 className={st.channels__user}>username:</h4>
                                            <p className={st.channels__text}>{channel.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <span></span>
                                <span></span>
                            </Link>
                        )
                    }
                    {
                        filterChannelItem &&
                        <h2 style={{
                            textAlign: 'center'
                        }}>General search</h2>
                    }
                    {
                        globalChannels.map((channel, index) =>
                            <Link
                                key={nanoid(9)}
                                className={
                                    [
                                        st.channels__link
                                        , currentChannelItem === index ? st.activeCurrentChannel : ''
                                    ].join(' ')}
                                to={`${CHAT_PATH}${channel.id}`}
                            >
                                <div
                                    className={st.channels__linkWrapper}
                                    onClick={() => handleCurrentChannel(channel.id, index)}
                                >
                                    <div
                                        className={st.channels__linkLeft}
                                    >
                                        <img
                                            className={st.channels__avatar}
                                            src="https://images.pexels.com/photos/17827719/pexels-photo-17827719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                            alt="channel-avatar"
                                        />
                                    </div>
                                    <div
                                        className={st.channels__linkRight}
                                    >
                                        <h2 className={st.channels__name}>
                                            {channel.name}
                                        </h2>
                                        <div className={st.channels__description}>
                                            <h4 className={st.channels__user}>username:</h4>
                                            <p className={st.channels__text}>{channel.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <span></span>
                                <span></span>
                            </Link>
                        )
                    }
                </ul>
            </section>
        )
            ;
    }
;

export default Channels;