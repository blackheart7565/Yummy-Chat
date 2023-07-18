import menubar from '../styles/module/MenuBar.module.scss';
import React, {useEffect, useRef} from 'react';
import MyButton from "../UI/MyButton/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {addNewChannel, addNewMessage} from "../utils/reducer-service";
import {connect} from "../utils/socket-connect";
import {PORT} from "../utils/globalVars";
import {logDOM} from "@testing-library/react";

const MenuBar = ({User, websocket}) => {
    const dispatch = useDispatch();

    const newChannel = () => {

        const channel = {
            id: Date.now()
            , displayNameChannel: 'Sato'
            , messages: []
            , users: [{
                usernameUser: User.username
                , phoneUser: User.phone
            }]
        }

        const channels = {
            event: 'channel'
            , channel: channel
        }

        websocket.current.send(JSON.stringify(channels));
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