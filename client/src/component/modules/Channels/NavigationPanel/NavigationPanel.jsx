import React from 'react';

import st from './NavigationPanel.module.scss';

const NavigationPanel = (
    {
        isVisible
        , setIsVisible
        , isHideChannel
        , setIsHideChannel
        , ...props
    }) => {
    const rootMenuBurgerClasses = [st.burger__btn];

    if (isVisible) {
        rootMenuBurgerClasses.push(st.active__menuBurger)
    }

    const handleBurger = (e) => {
        e.preventDefault();

        if (isVisible) {
            e.currentTarget.classList.remove(st.active__menuBurger);
            setIsVisible(false);
        } else {
            e.currentTarget.classList.add(st.active__menuBurger);
            setIsVisible(true);
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