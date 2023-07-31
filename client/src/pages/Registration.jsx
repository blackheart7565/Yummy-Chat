import React from 'react';
import reg from '../styles/module/Registration.module.scss';
import RegForm from "../component/RegForm";
import auth from "../styles/module/Authorization.module.scss";

const Registration = () => {
    return (
        <div className={reg.reg}>
            <div className={reg.reg__inner}>
                <h2 className={auth.auth__title}>
                    Registration
                </h2>
                <RegForm />
            </div>
        </div>
    );
};

export default Registration;