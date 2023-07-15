import hsp from './HideAndShowPass.module.scss';
import React from 'react';

const HideAndShowPass = () => {
    const classArr = [hsp.hideAndShowPass, hsp.hideAndShowPass__hide];

    const ViewAndHidePassword = () => {
        const blockPass = document.getElementById('passwordBlock').children

        if (blockPass[0].type === 'password') {
            blockPass[0].type = 'text';
            blockPass[1].classList.add(hsp.hideAndShowPass__show);
            blockPass[1].classList.remove(hsp.hideAndShowPass__hide);
        } else {
            blockPass[0].type = 'password';
            blockPass[1].classList.add(hsp.hideAndShowPass__hide);
            blockPass[1].classList.remove(hsp.hideAndShowPass__show);
        }
    }

    return (
        <div
            className={classArr.join(' ')}
            onClick={ViewAndHidePassword}
        />
    );
};

export default HideAndShowPass;