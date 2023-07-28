import menubar from '../styles/module/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {createChannel} from "../http/channelAPI";
import ChannelService from "../utils/reducer/service/channelService";

const MenuBar = ({websocket}) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const newChannel = async () => {
        const channel = {
            name: prompt('Name'),
            description: prompt('Description'),
            type: "public",
            userId: currentUser.id,
            messages: []
        }
        createChannel(channel).then(data => dispatch(ChannelService.addNewChannel(data)));

        // websocket.current.send(
        //     JSON.stringify(channel)
        // );
    }

    return (
        <div className={menubar.menuBar}>
            <div className={menubar.menuBar__inner}>
                <MyButton
                    onClick={newChannel}
                    className={menubar.menuBar__settings}
                >
                    <div></div>
                </MyButton>
            </div>
        </div>
    );
};

export default MenuBar;