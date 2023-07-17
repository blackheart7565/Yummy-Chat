import chnlitem from '../styles/module/ChannelsItem.module.scss'
import React from 'react';

const ChannelsItem = ({channel, ...props}) => {
    return (
        <div
            {...props}
            className={chnlitem.channels__item}
        >
            <img className={chnlitem.channels__logoChannel}
                 src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg"
                 alt="logo-channel"/>
            <div className={chnlitem.channels__header}>
                <h2 className={chnlitem.channels__title}>Sato</h2>
                <p className={chnlitem.channels__description}>цуацуацуацацуаца</p>
            </div>
        </div>
    );
};

export default ChannelsItem;