import menubar from '../styles/module/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";
import {useDispatch} from "react-redux";
import {ADD_CHANNEL} from "../utils/globalVars";

const MenuBar = ({User}) => {
    const dispatch = useDispatch()

    const newChannel = () => {
        dispatch(
            {
                type: ADD_CHANNEL
                , payload: {
                    id: Date.now()
                    , displayNameChannel: 'Sato'
                    , message: []
                    , users: [{
                        usernameUser: User.username
                        , phoneUser: User.phone
                    }]
                }
            }
        )
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