import authFrom from '../styles/module/AuthFrom.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import {useDispatch} from "react-redux";
import {login} from "../http/useAPI";
import UserService from "../utils/reducer/service/userService";
import {Link, useLocation} from "react-router-dom";
import {REGISTRATION_PATH} from "../utils/const-vars";

const AuthFrom = ({IsRegistration, ...props}) => {
    const [userAuth, setUserAuth] = useState({
        email: ''
        , password: ''
    });
    const dispatch = useDispatch();
    const location = useLocation();

    const singIn = async (e) => {
        e.preventDefault();
        const user = await login(userAuth.email, userAuth.password)

        if (user) {
            dispatch(
                UserService.toggleIsLogin(true)
            );
            dispatch(
                UserService.addCurrentUser(user)
            );
        }
    }

    return (
        <form {...props} className={authFrom.form}>
            <MyInput
                value={userAuth.email}
                onChange={(e) => setUserAuth({...userAuth, email: e.target.value})}
                className={authFrom.form__email}
                placeholder='Email'
            />

            <div
                id='passwordBlock'
                className={authFrom.form__passwordBlock}
            >
                <MyInput
                    value={userAuth.password}
                    onChange={(e) => setUserAuth({...userAuth, password: e.target.value})}
                    type='password'
                    className={authFrom.form__password}
                    placeholder='Password'
                />
                <HideAndShowPass/>
            </div>
            <MyButton
                className={authFrom.form__login}
                onClick={singIn}
            >
                Log In
            </MyButton>
            <Link
                className={authFrom.form__info}
                to={REGISTRATION_PATH}
                state={location}
            >
                Don't have an account yet?
            </Link>
        </form>
    );
};

export default AuthFrom;