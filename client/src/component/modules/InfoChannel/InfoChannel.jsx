import React, {useEffect, useState} from 'react';

import './InfoChannel.css';
import {useRedux} from "../../../hook/redux";

const InfoChannel = () => {
    const {channel} = useRedux();
    const [countUsers, setCountUsers] = useState(0);

    useEffect(() => {
        setCountUsers(channel.currentChannel.users.length);
    }, [channel.currentChannel]);

    return (
        <section className={'info-channel'}>
            <div className="info-channel__avatar">
                <img
                    src="https://images.pexels.com/photos/17827719/pexels-photo-17827719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="info-channel-avatar"
                />
            </div>
            <div className="info-channel__content">
                <div className="info-channel__title">
                    <span>{channel.currentChannel.name}</span>
                </div>
                <div className="info-channel__count">
                    <span>{countUsers}</span>
                    <span>{countUsers > 1 ? ' учасника' : ' учасник'}</span>
                </div>
            </div>
        </section>
    );
};

export default InfoChannel;