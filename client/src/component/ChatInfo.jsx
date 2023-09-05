import React from 'react';
import st from '../styles/module/ChatInfo.module.scss'
import {useRedux} from "../hook/useRedux";
import ChannelService from "../utils/reducer/service/channelService";

const ChatInfo = () => {
    const {channel, dispatch} = useRedux();

    const chatInfoBtn = [
        st.chatInfo__btn
        , channel.isCloseActive ? st.chatInfo__btn_active : ''
    ];

    const showChannel = () => {
        document.body.classList.toggle('is-left-show');
        dispatch(ChannelService.toggleCloseActive());
    }

    return (
        <div className={st.chatInfo}>
            <button
                className={chatInfoBtn.join(' ')}
                onClick={showChannel}
            >
                <span></span>
            </button>
            <img
                className={st.chatInfo__avatar}
                src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg"
                alt="avatar_channel_info"
            />
            <div className={st.chatInfo__name}>
                {channel.currentChannel.name}
            </div>
        </div>
    );
};

export default ChatInfo;