import React from 'react';
import st from '../styles/module/ChatInfo.module.scss'
import {useRedux} from "../hook/redux";

const ChatInfo = () => {
    const {channel} = useRedux();

    return (
        <div className={st.chatInfo}>
            <button className={st.chatInfo__btn}>

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