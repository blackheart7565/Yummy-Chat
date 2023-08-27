import React, {forwardRef, useRef} from 'react';
import {GithubOutlined, NotificationOutlined, SettingOutlined} from "@ant-design/icons";

import './MenuBurger.css';

const MenuBurger = forwardRef(({btnMenuBurgerRef, createChannelVisible, ...props}, ref) => {

    function closeMenuBurger() {
        ref?.current.classList.remove('active__menu-burger');
        btnMenuBurgerRef?.current.classList.remove('active__menu-burger');
    }

    const createChannel = (e) => {
        e.preventDefault();
        createChannelVisible(true);
        closeMenuBurger();
    }


    return (
        <div
            {...props}
            className="menu-burger"
            ref={ref}
            onClick={closeMenuBurger}
        >
            <div
                className="menu-burger__wrapper"
                onClick={(e) => e.stopPropagation()}
            >
                <ul className="menu-burger__list">
                    <li className="menu-burger__item">
                        <a className={'menu-burger__link'} href={'#'}
                           onClick={createChannel}
                        >
                            <NotificationOutlined
                                className={'menu-burger__icon'}
                            />
                            <span className={'menu-burger__text'}>
                            Create Channel
                        </span>
                        </a>
                    </li>
                    <li className="menu-burger__item">
                        <a className={'menu-burger__link'} href={'#'}
                           onClick={(e) => e.preventDefault()}
                        >
                            <GithubOutlined
                                className={'menu-burger__icon'}
                            />
                            <span className={'menu-burger__text'}>
                            GitHub
                        </span>
                        </a>
                    </li>
                    <li className="menu-burger__item">
                        <a className={'menu-burger__link'} href={'#'}
                           onClick={(e) => e.preventDefault()}
                        >
                            <SettingOutlined
                                className={'menu-burger__icon'}
                            />
                            <span className={'menu-burger__text'}>
                            Settings
                        </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default MenuBurger;