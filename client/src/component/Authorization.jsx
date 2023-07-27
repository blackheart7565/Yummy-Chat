import React, {useState} from 'react';
import auth from '../styles/module/Authorization.module.scss';
import Registration from "./Registration";
import AuthFrom from "./AuthFrom";
import {useDispatch, useSelector} from "react-redux";

const Authorization = () => {
    const [condition, setCondition] = useState({
        isRegistration: true
    });
    const isLogin = useSelector(state => state.isLogin);
    const rootClass = [auth.auth];
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    const IsRegs = (isRegistration) => {
        setCondition({...condition, isRegistration: isRegistration})
    }


    if (!condition.isRegistration) {
        return <Registration/>
    }

    if (isLogin) {
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
                />
            </div>
        </div>
    );
};

export default Authorization;