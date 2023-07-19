import menubar from '../styles/module/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";
import {useSelector} from "react-redux";

const MenuBar = ({websocket}) => {
    const currentUser = useSelector(state => state.currentUser);

    const newChannel = () => {
        const channels = {
            event: 'channel'
            , channel: {
                id: Date.now()
                , avatar: [] // аватарка канала в виде массива байтов или в виде path строки
                , displayNameChannel: 'Sato'
                , description: ''
                , status: 'public'
                , messages: []
                , users: [{
                    id: currentUser.id
                    , usernameUser: currentUser.username
                    , phoneUser: currentUser.phone
                }]
            }
        }

        websocket.current.send(
            JSON.stringify(channels)
        );
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