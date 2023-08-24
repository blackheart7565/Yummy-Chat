import React, {useEffect, useRef, useState} from 'react';
import {useRedux} from "../../../hook/redux";
import {Link} from "react-router-dom";

import './Channels.css';
import {CHAT_PATH} from "../../../utils/const-vars";
import ChannelService from "../../../utils/reducer/service/channelService";
import ChannelAPI from "../../../http/channelAPI";
import {nanoid} from "nanoid";

const Channels = () => {
    const {dispatch, channel} = useRedux();
    const [currentChannelItem, setCurrentChannelItem] = useState(null);
    const channelsPanel = useRef(null);
    const channelsList = useRef(null);
    const menuBurger = useRef(null);

    const handleCurrentChannel = (e, channelId, index) => {
        e.preventDefault();
        dispatch(
            ChannelService.setCurrentChannel(channelId)
        );
        document.body.classList.remove('is-left-show');
        dispatch(ChannelService.toggleCloseActive());

        setCurrentChannelItem(index);
    }

    const handleChannelHide = (e) => {
        e.preventDefault();
        channelsPanel.current?.classList.toggle('active__hideChannel');
        channelsList.current?.classList.toggle('active__hideChannel');
    }

    const handleBurger = (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active__menu-burger');
        menuBurger.current?.classList.toggle('active__menu-burger');
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
        <section
            className="channels"
            id={'chat__left'}
            ref={channelsPanel}
        >
            <div className="channels__burger">
                <button
                    className="burger__btn"
                    onClick={handleBurger}
                >
                    <span></span>
                </button>
                <button
                    className="burger__btn-hide"
                    onClick={handleChannelHide}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className="channels__search">
                <input
                    className={`channels__search--input`}
                    type="text"
                    placeholder={'Search...'}
                />
                <button className={`channels__search--btn`}>
                    <img
                        className={`channels__search--ico`}
                        src={`/search/search-dark.png`}
                        alt="search-ico"
                    />
                </button>
            </div>

            <ul
                className="channels__list channels__list-scroll"
                ref={channelsList}
            >
                {
                    channel.channels.map((channel, index) =>
                        <Link
                            key={nanoid(9)}
                            className={`channel__link ${currentChannelItem === index ? 'active-current-channel' : ''}`}
                            to={`${CHAT_PATH}${channel.id}`}
                            onClick={(e) => handleCurrentChannel(e, channel.id, index)}
                        >
                            <div className="channel__link-wrapper">
                                <div className="channel__link--left">
                                    <img
                                        className="channel__avatar"
                                        src="https://images.pexels.com/photos/17827719/pexels-photo-17827719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="channel-avatar"/>
                                </div>
                                <div className="channel__link--right">
                                    <h2 className="channel__name">
                                        {channel.name}
                                    </h2>
                                    <div className="channel__description">
                                        <h4 className="channel__user">username:</h4>
                                        <p className="channel__text">{channel.description}</p>
                                    </div>
                                </div>
                            </div>
                            <span></span>
                            <span></span>
                        </Link>
                    )
                }
            </ul>

            <div
                className="menu-burger"
                id={'menu-burger'}
                ref={menuBurger}
            ></div>
        </section>
    );
};

export default Channels;