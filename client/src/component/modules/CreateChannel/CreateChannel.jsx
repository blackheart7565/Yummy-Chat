import React, {useState} from 'react';

import st from './CreateChannel.module.scss';
import TextArea from "antd/es/input/TextArea";
import {useRedux} from "../../../hook/useRedux";
import ChannelAPI from "../../../http/channelAPI";
import ChannelService from "../../../utils/reducer/service/channelService";
import Avatar from "../Avatar/Avatar";

const CreateChannel = (
    {
        isVisible
        , setIsVisible
    }) => {
    const {dispatch, user} = useRedux();
    const [isImage, setIsImage] = useState(false);
    const [value, setValue] = useState({
        avatar: ""
        , name: ""
        , description: ""
        , type: "private"
    });

    const rootClasses = [st.createChannel]

    if (isVisible) {
        rootClasses.push(st.createChannel__show)
    }

    const handleSubscribeType = (e) => {
        setValue({...value, type: e.target.value});
    }

    const createChannel = async () => {
        if (value.name) {
            await newChannel();
            setIsVisible(false);
        }
    }

    const newChannel = async () => {
        const channel = {
            name: value.name,
            description: value?.description,
            type: value.type,
            userId: user.currentUser.id,
            messages: []
        }

        try {
            ChannelAPI.createChannel(channel)
                .then(chanel => {
                        dispatch(
                            ChannelService.addNewChannel(chanel)
                        );
                    }
                );
            setValue({
                avatar: ""
                , name: ""
                , description: ""
                , type: "private"
            });
            setIsImage(false);
        } catch (e) {
            console.error(e.message);
        }
    }

    const closedWindowCreateChannel = () => {
        setIsVisible(false);
        setIsImage(false);
        setValue({
            avatar: ""
            , name: ""
            , description: ""
            , type: "private"
        })
    }

    /**
     * @param {String} avatar
     * @param {String} isImage
     */
    const valueCacheCallback = (avatar, isImage) => {
        setValue({...value, avatar: avatar});
        setIsImage(isImage);
    }

    return (
        <section
            className={rootClasses.join(' ')}
            onClick={closedWindowCreateChannel}
        >
            <div
                className={st.createChannel__wrapper}
                onClick={e => e.stopPropagation()}
            >
                <div className={st.createChannel__container}>
                    <div className={st.createChannel__header}>
                        <Avatar
                            isVisible={isImage}
                            setIsVisible={setIsImage}
                            valueCacheCallback={valueCacheCallback}
                        />
                        <div className={st.createChannel__name}>
                            <label htmlFor={'channel-name'}>
                                <div>Channel Name</div>
                                <input
                                    type={`text`}
                                    id={'channel-name'}
                                    placeholder={'Name'}
                                    autoFocus
                                    className={st.createChannel__nameInput}
                                    value={value.name}
                                    onChange={(e) => setValue({...value, name: e.target.value})}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={st.createChannel__description}>
                        <TextArea
                            className={st.createChannel__descriptionInput}
                            placeholder="Description"
                            autoSize={{minRows: 3, maxRows: 3}}
                            value={value.description}
                            onChange={(e) => setValue({...value, description: e.target.value})}
                        />
                    </div>
                    <div className={st.createChannel__types}>
                        <div className={st.createChannel__private}>
                            <label htmlFor={'private-subscribe'}>
                                <input
                                    className={st.createChannel__privateChackbox}
                                    type="radio"
                                    id={'private-subscribe'}
                                    name={'subscribe-types'}
                                    value={'private'}
                                    checked={value.type === 'private'}
                                    onChange={handleSubscribeType}

                                />
                                <span>Private</span>
                            </label>
                        </div>
                        <div className={st.createChannel__public}>
                            <label htmlFor={'public-subscribe'}>
                                <input
                                    className={st.createChannel__publicChackbox}
                                    type="radio"
                                    id={'public-subscribe'}
                                    name={'subscribe-types'}
                                    value={'public'}
                                    checked={value.type === 'public'}
                                    onChange={handleSubscribeType}

                                />
                                <span>Public</span>
                            </label>
                        </div>
                    </div>
                    <div className={st.createChannel__btns}>
                        <button
                            className={st.createChannel__backBtn}
                            onClick={closedWindowCreateChannel}
                        >
                            Back
                        </button>
                        <button
                            className={st.createChannel__createBtn}
                            onClick={createChannel}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateChannel;