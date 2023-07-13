import menubar from '../styles/MenuBar.module.scss';
import React from 'react';
import MyButton from "../UI/MyButton/MyButton";

const MenuBar = () => {
    return (
        <div className={menubar.menuBar}>
            <div className={menubar.menuBar__inner}>
                <MyButton
                    className={menubar.menuBar__settings}
                />
            </div>
        </div>
    );
};

export default MenuBar;