import React, {useRef, useState} from 'react';

import st from './CreateChannel.module.scss';
import TextArea from "antd/es/input/TextArea";
import {CameraOutlined} from "@ant-design/icons";

const CreateChannel = ({visible, setVisible}) => {
    const rootClasses = [st.createChannel]
    const channelNameInputRef = useRef(null);
    const [subscribeType, setSubscribeType] = useState('private');

    if (visible) {
        rootClasses.push(st.createChannel__show)
    }

    const handleSubscribeType = (e) => {
        setSubscribeType(e.target.value);
    }

    const createChannel = () => {
        const value = channelNameInputRef.current?.value;
        if (value) {
            setVisible(false);
        }
    }

    return (
        <section
            className={rootClasses.join(' ')}
            onClick={() => setVisible(false)}
        >
            <div
                className={st.createChannel__wrapper}
                onClick={e => e.stopPropagation()}
            >
                <div className={st.createChannel__container}>
                    <div className={st.createChannel__header}>
                        <div className={st.createChannel__avatar}>
                            <CameraOutlined
                                className={st.createChannel__avatarIco}
                            />
                        </div>
                        <div className={st.createChannel__name}>
                            <label htmlFor={'channel-name'}>
                                <div>Channel Name</div>
                                <input
                                    type={`text`}
                                    id={'channel-name'}
                                    placeholder={'Name'}
                                    autoFocus
                                    className={st.createChannel__nameInput}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={st.createChannel__description}>
                        <TextArea
                            ref={channelNameInputRef}
                            className={st.createChannel__descriptionInput}
                            placeholder="Description"
                            autoSize={{minRows: 3, maxRows: 3}}
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
                                    checked={subscribeType === 'private'}
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
                                    checked={subscribeType === 'public'}
                                    onChange={handleSubscribeType}

                                />
                                <span>Public</span>
                            </label>
                        </div>
                    </div>
                    <div className={st.createChannel__btns}>
                        <button
                            className={st.createChannel__backBtn}
                            onClick={() => setVisible(false)}
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