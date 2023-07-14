import yci from './MyInput.module.scss';

import React from 'react';

const MyInput = (props, {children}) => {
    const classArr = [yci.input, props.className]

    return (
        <input {...props} className={classArr.join(' ')}>
            {children}
        </input>
    );
};

export default MyInput;