import React, {forwardRef} from 'react';
import {GithubOutlined, NotificationOutlined, SettingOutlined} from "@ant-design/icons";

import st from './MenuBurger.module.scss';

const MenuBurger = forwardRef((
    {
        isVisible
        , setIsVisible
        , buttonEnableRef
        , createChannelVisible
        , ...props
    }, ref) => {

    const rootClasses = [st.menuBurger];

    if (isVisible) {
        rootClasses.push(st.active);
    }

    function closeMenuBurger() {
        setIsVisible(false);
    }

    const createChannel = (e) => {
        e.preventDefault();
        createChannelVisible(true);
        closeMenuBurger();
    }

    return (
        <div
            {...props}
            className={rootClasses.join(' ')}
            ref={ref}
            onClick={closeMenuBurger}
        >
            <div
                className={st.menuBurger__wrapper}
                onClick={(e) => e.stopPropagation()}
            >
                <ul className={st.menuBurger__list}>
                    <li className={st.menuBurger__item}>
                        <a className={st.menuBurger__link} href={'#'}
                           onClick={createChannel}
                        >
                            <NotificationOutlined
                                className={st.menuBurger__icon}
                            />
                            <span className={st.menuBurger__text}>
                            Create Channel
                        </span>
                        </a>
                    </li>
                    <li className={st.menuBurger__item}>
                        <a
                            className={st.menuBurger__link}
                            href={'https://github.com/blackheart7565/Yummy-Chat'}
                            target={'_blank'}
                        >
                            <GithubOutlined
                                className={st.menuBurger__icon}
                            />
                            <span className={st.menuBurger__text}>
                            GitHub
                        </span>
                        </a>
                    </li>
                    <li className={st.menuBurger__item}>
                        <a className={st.menuBurger__link} href={'#'}
                           onClick={(e) => e.preventDefault()}
                        >
                            <SettingOutlined
                                className={st.menuBurger__icon}
                            />
                            <span className={st.menuBurger__text}>
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