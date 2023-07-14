import opt from './MyOption.module.scss';
import React from 'react';

const MyOption = ({children, ...props}) => {
    const classArr = [opt.selectItem, props.className];

    return (
        <option {...props} className={classArr.join(' ')}>
            {children}
        </option>
    );
};

export default MyOption;