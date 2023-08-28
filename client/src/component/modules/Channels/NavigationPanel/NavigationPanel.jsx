import React from 'react';

import st from './NavigationPanel.module.scss';

const NavigationPanel = (
    {
        visible
        , setVisible
        , isHideChannel
        , setIsHideChannel
        , ...props
    }) => {
    const rootMenuBurgerClasses = [st.burger__btn];


    if (visible) {
        rootMenuBurgerClasses.push(st.active__menuBurger)
    }

    const handleBurger = (e) => {
        e.preventDefault();

        if (visible) {
            e.currentTarget.classList.remove('active__menu-burger');
            setVisible(false);
        } else {
            e.currentTarget.classList.add('active__menu-burger');
            setVisible(true);
        }
    }

    const handleChannelHide = (e) => {
        e.preventDefault();

        if (isHideChannel) {
            setIsHideChannel(false);
        } else {
            setIsHideChannel(true);
        }
    }

    return (
        <div
            {...props}
            className={st.navigation}
        >
            <button
                className={rootMenuBurgerClasses.join(' ')}
                onClick={handleBurger}
            >
                <span></span>
            </button>
            <button
                className={st.burger__btnHide}
                onClick={handleChannelHide}
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    );
};

export default NavigationPanel;