import React from 'react';
import reg from '../styles/module/Registration.module.scss';
import '../styles/base/base.scss'
import RegForm from "../component/RegForm";

const Registration = () => {
    const rootClass = [reg.reg];

    return (
        <div className={rootClass.join(' ')}>
            <div className={reg.reg__inner}>
                <h2 className={'title'}>
                    Registration
                </h2>
                <RegForm />
            </div>
        </div>
    );
};

export default Registration;