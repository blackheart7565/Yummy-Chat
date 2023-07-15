import React, {useState} from 'react';
import reg from '../styles/module/Registration.module.scss';
import Authorization from "./Authorization";
import RegForm from "./RegForm";
import auth from "../styles/module/Authorization.module.scss";

const Registration = ({getUser}) => {
    const [isLogin, setIsLogin] = useState(false);

    const getIsLogIn = (isLogin) => {
        setIsLogin(isLogin);
    }

    if (isLogin) {
        return <Authorization getUser={getUser}/>;
    }

    return (
        <div className={reg.reg}>
            <div className={reg.reg__inner}>
                <h2 className={auth.auth__title}>
                    Registration
                </h2>
                <RegForm getIsLogIn={getIsLogIn} />
            </div>
        </div>
    );
};

export default Registration;