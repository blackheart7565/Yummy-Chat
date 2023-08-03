import React from 'react';
import auth from '../styles/module/Authorization.module.scss';
import '../styles/base/base.scss';
import AuthFrom from "../component/AuthFrom";

const Authorization = () => {
    const rootClass = [auth.auth];

    return (
        <div className={rootClass.join(' ')}>
            <div className={auth.auth__inner}>
                <h2 className={'title'}>
                    Authorization
                </h2>
                <AuthFrom/>
            </div>
        </div>
    );
};

export default Authorization;