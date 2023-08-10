import React from 'react';
import st from '../styles/module/Authorization.module.scss';
import '../styles/base/base.scss';
import AuthFrom from "../component/AuthFrom";

const Authorization = () => {
    const rootClass = [st.auth];

    return (
        <div className={rootClass.join(' ')}>
            <i>VIII</i>
            <i>IV</i>
            <i>III</i>
            <i>XVII</i>
            <img className={st.auth__img} src="/wing/left-wing.png" alt="/left-wing"/>
            <div className={st.auth__inner}>
                <h2 className={'title'}>
                    Authorization
                </h2>
                <AuthFrom/>
            </div>
            <img className={st.auth__img} src="/wing/right-wing.png" alt="right-wing"/>
        </div>
    );
};

export default Authorization;