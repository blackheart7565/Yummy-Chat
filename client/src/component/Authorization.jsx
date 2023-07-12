import React, {useState} from 'react';
import auth from '../styles/Authorization.module.scss';
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import MySelect from "../UI/MySelect/MySelect";

const Authorization = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const ViewAndHidePassword = (e) => {
        const blockPass = document.getElementById('passwordBlock').children

        if (blockPass[0].type === 'password') {
            blockPass[0].type = 'text';
            blockPass[1].classList.add(auth.showPass);
            blockPass[1].classList.remove(auth.hidePass);
        } else {
            blockPass[0].type = 'password';
            blockPass[1].classList.add(auth.hidePass);
            blockPass[1].classList.remove(auth.showPass);
        }
    }

    const ClearInput = (e) => {
        e.preventDefault();
        setUsername('');
        setEmail('');
        setPhone('');
        setPassword('');
    }

    return (
        <div className={auth.auth}>
            <div className={auth.auth__inner}>
                <form className={auth.auth__form}>
                    <MyInput
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={[auth.auth__username].join(' ')}
                        type="text"
                        placeholder='Username'
                    />
                    <MyInput
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={auth.auth__email}
                        type="email"
                        placeholder='Email'
                    />
                    <div className={auth.auth__phoneBlock}>
                        <MySelect className={auth.auth__phoneSelect}/>
                        <MyInput
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className={auth.auth__phone}
                            type="text"
                            placeholder='Phone'
                        />
                    </div>
                    <div
                        id='passwordBlock'
                        className={auth.auth__passwordBlock}
                    >
                        <MyInput
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={auth.auth__password}
                            type="password"
                            placeholder='Password'
                        />
                        <div
                            className={[auth.auth__passwordHideAndView, auth.hidePass].join(' ')}
                            onClick={ViewAndHidePassword}
                        />
                    </div>
                    <div className={auth.auth__btns}>
                        <MyButton
                            className={auth.auth__login}
                            onClick={(e) => e.preventDefault()}
                        >
                            Log in
                        </MyButton>
                        <MyButton
                            className={auth.auth__login}
                            onClick={ClearInput}
                        >
                            Clear
                        </MyButton>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Authorization;