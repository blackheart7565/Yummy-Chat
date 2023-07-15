import React, {useRef, useState} from 'react';
import auth from '../styles/module/Authorization.module.scss';
import Registration from "./Registration";
import AuthFrom from "./AuthFrom";

const Authorization = ({getUser}) => {
    const [isRegistration, setIsRegistration] = useState(true);
    const [isLogIn, setIsLogIn] = useState(false);
    const rootClass = [auth.auth];

    const IsRegs = (isRegistration) => {
        setIsRegistration(isRegistration)
    }

    const IsLogIn = (isLogIn, user) => {
        setIsLogIn(isLogIn);
        getUser(user);
    }

    if (!isRegistration) {
        return <Registration
            getUser={getUser}
        />
    }

    if(isLogIn) {
        rootClass.push(auth.authClose);
    }

    return (
        <div className={rootClass.join(' ')}>
            <div className={auth.auth__inner}>
                <h2 className={auth.auth__title}>
                    Authorization
                </h2>
                <AuthFrom
                    IsRegistration={IsRegs}
                    IsAuthorization={IsLogIn}
                />
            </div>
        </div>
    );
};

export default Authorization;