import authFrom from '../styles/module/AuthFrom.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import {useSelector} from "react-redux";

const AuthFrom = ({IsRegistration, IsAuthorization, ...props}) => {
    const Users = useSelector(state => state.users);
    const [user, setUser] = useState({
        email: ''
        , password: ''
    });

    const logIn = (e) => {
        e.preventDefault();
        Users.forEach(user => {
            if (user.email === user.email && user.password === user.password) {
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
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className={authFrom.form__email}
                placeholder='Email'
            />

            <div
                id='passwordBlock'
                className={authFrom.form__passwordBlock}
            >
                <MyInput
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
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