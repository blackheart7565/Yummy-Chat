import React, {useState} from 'react';
import {CameraOutlined} from "@ant-design/icons";

import st from './Avatar.module.scss';

const Avatar = (
    {
        isVisible
        , setIsVisible
        , valueCacheCallback
        , ...props
    }) => {
    const [avatarSource, setAvatarSource] = useState('');

    const imageClasses = [st.avatarImage]

    if (isVisible) {
        imageClasses.push(st.avatarImageActive);
    }

    const openFiles = (e) => {
        const target = e.target;

        if (!FileReader) {
            return;
        }

        if (!target.files.length) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setAvatarSource(fileReader.result);
            valueCacheCallback(fileReader.result, true);
        }
        fileReader.readAsDataURL(target.files[0]);
    }

    return (
        <div
            {...props}
            className={st.avatar}
        >
            <label
                className={st.avatarWrapper}
                htmlFor={'input-file-open'}
            >
                <input
                    className={st.avatarFile}
                    type="file"
                    id="input-file-open"
                    onChange={openFiles}
                />
                <div className={st.avatarIcoEnvelope}>
                    <CameraOutlined
                        className={st.avatarIcon}
                    />
                </div>
                <img
                    className={imageClasses.join(' ')}
                    src={avatarSource}
                    alt="channel-avatar"
                />
            </label>
        </div>
    );
};

export default Avatar;