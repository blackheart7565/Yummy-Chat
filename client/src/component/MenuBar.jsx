import menubar from '../styles/module/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";

const MenuBar = ({User, websocket}) => {
    const newChannel = () => {
        const channels = {
            event: 'channel'
            , channel: {
                id: Date.now()
                , status: 'public'
                , displayNameChannel: 'Sato'
                , messages: []
                , users: [{
                    id: User.id
                    , usernameUser: User.username
                    , phoneUser: User.phone
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