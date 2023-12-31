import React, {useRef, useState} from 'react';
import regForm from "../styles/module/RegForm.module.scss";
import MyInput from "../UI/MyInput/MyInput";
import MySelect from "../UI/MySelect/MySelect";
import HideAndShowPass from "../UI/HideAndShowPass/HideAndShowPass";
import MyButton from "../UI/MyButton/MyButton";
import UseAPI from "../http/useAPI";
import {useNavigate} from "react-router-dom";
import {LOGIN_PATH} from "../utils/const-vars";

const RegForm = ({...props}) => {
    const [userReg, setUserReg] = useState({
        username: ''
        , email: ''
        , phone: ''
        , password: ''
    });
    const selectCodeCountryPhone = useRef(null);
    const navigate = useNavigate();

    const RegistrationUser = async (e) => {
        e.preventDefault();

       try {
           await UseAPI.registration({
               username: userReg.username,
               email: userReg.email,
               phone: `${selectCodeCountryPhone.current.value}${userReg.phone}`,
               password: userReg.password,
           });
           navigate(LOGIN_PATH, {replace: true});
       }catch (e) {
           console.error(e.message)
       }
    }

    const Back = (e) => {
        e.preventDefault();
        navigate(-1)
    }

    return (
        <form
            {...props}
            className={regForm.form}
        >
            <MyInput
                value={userReg.username}
                onChange={e => setUserReg({...userReg, username: e.target.value})}
                className={[regForm.form__username].join(' ')}
                type="text"
                placeholder='Username'
            />
            <MyInput
                value={userReg.email}
                onChange={e => setUserReg({...userReg, email: e.target.value})}
                className={regForm.form__email}
                type="email"
                placeholder='Email'
            />
            <div className={regForm.form__phoneBlock}>
                <MySelect
                    ref={selectCodeCountryPhone}
                    className={regForm.form__phoneSelect}
                />
                <MyInput
                    value={userReg.phone}
                    onChange={e => setUserReg({...userReg, phone: e.target.value})}
                    className={regForm.form__phone}
                    type="text"
                    placeholder='Phone'
                />
            </div>
            <div
                id='passwordBlock'
                className={regForm.form__passwordBlock}
            >
                <MyInput
                    value={userReg.password}
                    onChange={e => setUserReg({...userReg, password: e.target.value})}
                    className={regForm.form__password}
                    type="password"
                    placeholder='Password'
                />
                <HideAndShowPass/>
            </div>
            <div className={regForm.form__btns}>
                <MyButton
                    className={regForm.form__login}
                    onClick={RegistrationUser}
                >
                    registration
                </MyButton>
                <MyButton
                    className={regForm.form__login}
                    onClick={Back}
                >
                    Back
                </MyButton>
            </div>
        </form>
    );
};

export default RegForm;