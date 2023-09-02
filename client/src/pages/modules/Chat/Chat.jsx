import React, {useEffect, useState} from 'react';
import Channels from "../../../component/modules/Channels/Channels";

import ChannelAPI from "../../../http/channelAPI";
import ChannelService from "../../../utils/reducer/service/channelService";
import {useRedux} from "../../../hook/redux";
import './Chat.css';
import ChatPanel from "../../../component/modules/ChatPanel/ChatPanel";
import CreateChannel from "../../../component/modules/CreateChannel/CreateChannel";
import MenuBurger from "../../../component/modules/MenuBurger/MenuBurger";
import {PORT} from "../../../utils/const-vars";
import {useWebSocket} from "../../../hook/useWebSocket";

const Chat = () => {
    const [createChannel, setCreateChannel] = useState(false);
    const [visibleMenuBurger, setVisibleMenuBurger] = useState(false);
    const {dispatch, channel, user} = useRedux();

    const {socket} = useWebSocket({
        url: `ws://localhost:${PORT}`
        , user: user.currentUser
    }, dispatch);

    const isCurrentChannel = channel.currentChannel?.users.some(u => u.id === user.currentUser.id);

    const createChannelVisible = (flag) => {
        setCreateChannel(flag);
    }

    // Получение каналов которые пренадлежат пользователю
    useEffect(() => {
        ChannelAPI.fetchUserChannel(user.currentUser.id)
            .then(channel =>
                dispatch(
                    ChannelService.addNewManyChannel(channel.channels)
                )
            );
    }, []);

    return (
        <div className={'chat'}>
            <Channels
                isVisible={visibleMenuBurger}
                setIsVisible={setVisibleMenuBurger}
            />
            <ChatPanel
                websocket={socket}
                isCurrentChannel={isCurrentChannel}
            />
            <MenuBurger
                isVisible={visibleMenuBurger}
                setIsVisible={setVisibleMenuBurger}
                createChannelVisible={createChannelVisible}
            />
            <CreateChannel
                isVisible={createChannel}
                setIsVisible={setCreateChannel}
            />
        </div>
    );
};

export default Chat;