import React, {useRef, useState} from 'react';
import reg from "../styles/module/Registration.module.scss";
import MyInput from "../UI/MyInput/MyInput";
import MySelect from "../UI/MySelect/MySelect";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import MyButton from "../UI/MyButton/MyButton";
import {registration} from "../http/useAPI";

const RegForm = ({getIsLogIn, ...props}) => {
    const [userReg, setUserReg] = useState({
        username: ''
        , email: ''
        , phone: ''
        , password: ''
    });
    const selectCodeCountryPhone = useRef(null);

    const RegistrationUser = async (e) => {
        e.preventDefault();

        await registration({
            username: userReg.username,
            email: userReg.email,
            phone: `${selectCodeCountryPhone.current.value}${userReg.phone}`,
            password: userReg.password,
        });
        getIsLogIn(true);
    }

    const Back = (e) => {
        e.preventDefault();
        getIsLogIn(true);
    }

    return (
        <form {...props} className={reg.reg__form}>
            <MyInput
                value={userReg.username}
                onChange={e => setUserReg({...userReg, username: e.target.value})}
                className={[reg.reg__username].join(' ')}
                type="text"
                placeholder='Username'
            />
            <MyInput
                value={userReg.email}
                onChange={e => setUserReg({...userReg, email: e.target.value})}
                className={reg.reg__email}
                type="email"
                placeholder='Email'
            />
            <div className={reg.reg__phoneBlock}>
                <MySelect
                    ref={selectCodeCountryPhone}
                    className={reg.reg__phoneSelect}
                />
                <MyInput
                    value={userReg.phone}
                    onChange={e => setUserReg({...userReg, phone: e.target.value})}
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
                    value={userReg.password}
                    onChange={e => setUserReg({...userReg, password: e.target.value})}
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