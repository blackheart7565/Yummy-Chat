import React, {useRef, useState} from 'react';
import reg from "../styles/module/Registration.module.scss";
import MyInput from "../UI/MyInput/MyInput";
import MySelect from "../UI/MySelect/MySelect";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import MyButton from "../UI/MyButton/MyButton";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/reducer-service";

const RegForm = ({getIsLogIn, ...props}) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [selectOption, setSelectOption] = useState('');
    const selectCodeCountryPhone = useRef(null);

    const RegistrationUser = (e) => {
        e.preventDefault();
        const User = {
            username: username,
            email: email,
            phone: `${selectCodeCountryPhone.current.value}${phone}`,
            password: password,
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
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={[reg.reg__username].join(' ')}
                type="text"
                placeholder='Username'
            />
            <MyInput
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={reg.reg__email}
                type="email"
                placeholder='Email'
            />
            <div className={reg.reg__phoneBlock}>
                <MySelect
                    ref={selectCodeCountryPhone}
                    value={selectOption}
                    onChange={(e) => setSelectOption(e.target.value)}
                    className={reg.reg__phoneSelect}
                />
                <MyInput
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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