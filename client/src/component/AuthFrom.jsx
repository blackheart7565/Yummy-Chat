import authFrom from '../styles/module/AuthFrom.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import {USERS} from "../utils/globalVars";

const AuthFrom = ({IsRegistration, IsAuthorization, ...props}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = (e) => {
        e.preventDefault();
        USERS.forEach(user => {
            if (user.email === email && user.password === password) {
                IsAuthorization(true, user);
            }
        });
    }
    const registration = (e) => {
        e.preventDefault();
        IsRegistration(false);
    }

    return (
        <form {...props} className={authFrom.form}>
            <MyInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={authFrom.form__email}
                placeholder='Email'
            />

            <div
                id='passwordBlock'
                className={authFrom.form__passwordBlock}
            >
                <MyInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    className={authFrom.form__password}
                    placeholder='Password'
                />
                <HideAndShowPass/>
            </div>
            <MyButton
                className={authFrom.form__login}
                onClick={logIn}
            >
                Log In
            </MyButton>
            <p
                className={authFrom.form__info}
                onClick={registration}
            >
                Don't have an account yet?
            </p>
        </form>
    );
};

export default AuthFrom;