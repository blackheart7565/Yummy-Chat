import menubar from '../styles/module/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";
import {useSelector} from "react-redux";
import {createChannel} from "../http/channelAPI";

const MenuBar = ({websocket}) => {
    const currentUser = useSelector(state => state.currentUser);

    const newChannel = async () => {
        const channel = {
            name: "wefwefwe",
            description: "",
            type: "public",
            userId: currentUser.id,
            messages: []
        }

        await createChannel(channel);

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