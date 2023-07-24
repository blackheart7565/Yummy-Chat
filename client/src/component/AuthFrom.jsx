import authFrom from '../styles/module/AuthFrom.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import {useDispatch} from "react-redux";
import {addCurrentUser} from "../utils/reducer/reducer-service";
import {login} from "../http/useAPI";

const AuthFrom = ({IsRegistration, IsAuthorization, ...props}) => {
    const [userAuth, setUserAuth] = useState({
        email: ''
        , password: ''
    });
    const dispatch = useDispatch();

    const singIn = async (e) => {
        e.preventDefault();
        const user = await login(userAuth.email, userAuth.password)

        if (user) {
            IsAuthorization(true);
            dispatch(
                addCurrentUser(user)
            );
        }
    }

    const singOut = (e) => {
        e.preventDefault();
        IsRegistration(false);
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
            <p
                className={authFrom.form__info}
                onClick={singOut}
            >
                Don't have an account yet?
            </p>
        </form>
    );
};

export default AuthFrom;