import ycb from './MyButton.module.scss';
import React from 'react';

const MyButton = ({children, ...props}) => {
    const classArr = [ycb.btnLogin, props.className]

    return (
        <button
            {...props}
            className={classArr.join(' ')}
        >
            {children}
        </button>
    );
};

export default MyButton;
