import React, {useEffect, useRef, useState} from 'react';
import Channels from "../../../component/modules/Channels/Channels";

import {connect} from "../../../utils/websocket/socket-connect";
import ChannelAPI from "../../../http/channelAPI";
import ChannelService from "../../../utils/reducer/service/channelService";
import MessageService from "../../../utils/reducer/service/messageService";
import {useRedux} from "../../../hook/redux";
import './Chat.css';
import ChatPanel from "../../../component/modules/ChatPanel/ChatPanel";
import CreateChannel from "../../../component/modules/CreateChannel/CreateChannel";
import MenuBurger from "../../../component/modules/MenuBurger/MenuBurger";
import MessageAPI from "../../../http/messageAPI";

const Chat = () => {
    const [createChannel, setCreateChannel] = useState(false);
    const [visibleMenuBurger, setVisibleMenuBurger] = useState(false);
    const {dispatch, channel, user} = useRedux();
    const socket = useRef();

    const isCurrentChannel = channel.currentChannel?.users.some(u => u.id === user.currentUser.id);

    const createChannelVisible = (flag) => {
        setCreateChannel(flag);
    }

    // Подключение websocket
    useEffect(() => {
        connect({socket, user: user.currentUser})(dispatch);
    }, []);

    // Получение каналов которые пренадлежат пользователю
    useEffect(() => {
        ChannelAPI.fetchUserChannel(user.currentUser.id)
            .then(channel =>
                dispatch(
                    ChannelService.addNewManyChannel(channel.channels)
                )
            );
    }, []);

    ///??????????? под вопросом удаления
    useEffect(() => {
        document.body.classList.add('is-left-show');
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
                websocket={socket}
            />
        </div>
    );
};

export default Chat;