import React from 'react';
import reg from '../styles/module/Registration.module.scss';
import '../styles/base/base.scss'
import RegForm from "../component/RegForm";
import st from "../styles/module/Authorization.module.scss";

const Registration = () => {
    const rootClass = [reg.reg];

    return (
        <div className={rootClass.join(' ')}>
            <i>VIII</i>
            <i>IV</i>
            <i>III</i>
            <i>XVII</i>
            <img className={st.auth__img} src="/wing/left-wing.png" alt="/left-wing"/>
            <div className={reg.reg__inner}>
                <h2 className={'title'}>
                    Registration
                </h2>
                <RegForm />
            </div>
            <img className={st.auth__img} src="/wing/right-wing.png" alt="right-wing"/>
        </div>
    );
};

export default Registration;