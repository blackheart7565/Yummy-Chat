import React, {useRef, useState} from 'react';
import reg from "../styles/module/Registration.module.scss";
import MyInput from "../UI/MyInput/MyInput";
import MySelect from "../UI/MySelect/MySelect";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import MyButton from "../UI/MyButton/MyButton";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/reducer-service";
import {nanoid} from "nanoid";

const RegForm = ({getIsLogIn, ...props}) => {
    const [user, setUser] = useState({
        username: ''
        , email: ''
        , phone: ''
        , password: ''
        , selectOption: ''
    });
    const selectCodeCountryPhone = useRef(null);
    const dispatch = useDispatch();

    const RegistrationUser = (e) => {
        e.preventDefault();
        const User = {
            id: nanoid(16),
            username: user.username,
            email: user.email,
            phone: `${selectCodeCountryPhone.current.value}${user.phone}`,
            password: user.password,
        }

        if (Object.values(User).every(value => value)) {
            dispatch(
                addUser(User)
            );
            getIsLogIn(true);
        }
    }

    const Back = (e) => {
        e.preventDefault();
        getIsLogIn(true);
    }

    return (
        <form {...props} className={reg.reg__form}>
            <MyInput
                value={user.username}
                onChange={e => setUser({...user, username: e.target.value})}
                className={[reg.reg__username].join(' ')}
                type="text"
                placeholder='Username'
            />
            <MyInput
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
                className={reg.reg__email}
                type="email"
                placeholder='Email'
            />
            <div className={reg.reg__phoneBlock}>
                <MySelect
                    ref={selectCodeCountryPhone}
                    value={user.selectOption}
                    onChange={(e) => setUser({...user, selectOption: e.target.value})}
                    className={reg.reg__phoneSelect}
                />
                <MyInput
                    value={user.phone}
                    onChange={e => setUser({...user, phone: e.target.value})}
                    className={reg.reg__phone}
                    type="text"
                    placeholder='Phone'
                />
            </div>
            <div
                id='passwordBlock'
                className={reg.reg__passwordBlock}
            >
                <MyInput
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    className={reg.reg__password}
                    type="password"
                    placeholder='Password'
                />
                <HideAndShowPass/>
            </div>
            <div className={reg.reg__btns}>
                <MyButton
                    className={reg.reg__login}
                    onClick={RegistrationUser}
                >
                    registration
                </MyButton>
                <MyButton
                    className={reg.reg__login}
                    onClick={Back}
                >
                    Back
                </MyButton>
            </div>
        </form>
    );
};

export default RegForm;