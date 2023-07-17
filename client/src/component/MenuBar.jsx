import menubar from '../styles/module/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";
import {useDispatch} from "react-redux";
import {addNewChannel} from "../utils/reducer-service";

const MenuBar = ({User}) => {
    const dispatch = useDispatch()

    const newChannel = () => {
        dispatch (
            addNewChannel('Sato', User)
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