import menubar from '../styles/module/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";
import ChannelAPI from "../http/channelAPI";
import ChannelService from "../utils/reducer/service/channelService";
import {useRedux} from "../hook/redux";

const MenuBar = ({websocket}) => {
    const {dispatch, user} = useRedux();

    const newChannel = async () => {
        const channel = {
            name: prompt('Name'),
            description: prompt('Description'),
            type: "public",
            userId: user.currentUser.id,
            messages: []
        }

        if (!Object.values(channel).every(item => item)) {
            return;
        }

        ChannelAPI.createChannel(channel)
            .then(chanel => {
                    dispatch(
                        ChannelService.addNewChannel(chanel)
                    );
                    sendWS(chanel)
                }
            );
    }

    const sendWS = (channel) => {
        const channelEvent = {
            event: 'channel'
            , channel
        }
        websocket.current.send(
            JSON.stringify(channelEvent)
        );
    }

    return (
        <div className={menubar.menuBar}>
            <MyButton
                onClick={newChannel}
                className={menubar.menuBar__settings}
            >
                <div></div>
            </MyButton>
        </div>
    );
};

export default MenuBar;