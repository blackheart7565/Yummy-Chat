import authFrom from '../styles/module/AuthFrom.module.scss';
import React, {useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import {useDispatch, useSelector} from "react-redux";
import {addCurrentUser} from "../utils/reducer/reducer-service";

const AuthFrom = ({IsRegistration, IsAuthorization, ...props}) => {
    const Users = useSelector(state => state.users);
    const [userAuth, setUserAuth] = useState({
        email: ''
        , password: ''
    });
    // const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    const logIn = (e) => {
        e.preventDefault();
        Users.forEach(user => {
            // if (user.email === userAuth.email && user.password === userAuth.password) {
            if (user.email === userAuth.email) {
                IsAuthorization(true);
                dispatch(
                    addCurrentUser(user)
                );
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