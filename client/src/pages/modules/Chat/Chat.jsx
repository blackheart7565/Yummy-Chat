import React, {useEffect, useRef, useState} from 'react';
import Channels from "../../../component/modules/Channels/Channels";

import {connect} from "../../../utils/websocket/socket-connect";
import ChannelAPI from "../../../http/channelAPI";
import ChannelService from "../../../utils/reducer/service/channelService";
import MessageService from "../../../utils/reducer/service/messageService";
import {useRedux} from "../../../hook/redux";
import './Chat.css';
import ChatPanel from "../../../component/modules/ChatPanel/ChatPanel";
import CreateChannel from "../../../component/modules/windows/CreateChannel/CreateChannel";
import MenuBurger from "../../../component/modules/Channels/MenuBurger/MenuBurger";

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

    // При старте получает все каналы всех пользователей
    useEffect(() => {
        ChannelAPI.fetchAllChannel().then(channels => {
                dispatch(
                    ChannelService.getAllChannel(channels)
                )
                channels.forEach(channel => {
                        dispatch(
                            MessageService.addManyMessage(channel.messages)
                        )
                    }
                )
            }
        )
    }, []);

    ///??????????? под вопросом удаления
    useEffect(() => {
        document.body.classList.add('is-left-show');
    }, []);

    return (
        <div className={'chat'}>
            <Channels
                visible={visibleMenuBurger}
                setVisible={setVisibleMenuBurger}
            />
            <ChatPanel
                websocket={socket}
                isCurrentChannel={isCurrentChannel}
            />
            <MenuBurger
                visible={visibleMenuBurger}
                setVisible={setVisibleMenuBurger}
                createChannelVisible={createChannelVisible}
            />
            <CreateChannel
                visible={createChannel}
                setVisible={setCreateChannel}
            />
        </div>
    );
};

export default Chat;