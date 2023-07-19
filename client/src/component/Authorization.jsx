import React, {useState} from 'react';
import auth from '../styles/module/Authorization.module.scss';
import Registration from "./Registration";
import AuthFrom from "./AuthFrom";

const Authorization = ({getUser}) => {
    const [condition, setCondition] = useState({
        isRegistration: true
        , isLogIn: false
    });
    const rootClass = [auth.auth];

    const IsRegs = (isRegistration) => {
        setCondition({...condition, isRegistration: isRegistration})
    }

    const IsLogIn = (isLogIn, user) => {
        setCondition({...condition, isLogIn: isLogIn})
        getUser(user);
    }

    if (!condition.isRegistration) {
        return <Registration
            getUser={getUser}
        />
    }

    if(condition.isLogIn) {
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