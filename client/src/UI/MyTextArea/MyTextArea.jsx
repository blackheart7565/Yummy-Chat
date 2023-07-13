import textarea from './MyTextArea.module.scss';
import React from 'react';

const MyTextArea = ({children, ...props}) => {
    const classArr = [textarea.textArea, props.className];

    return (
        <textarea {...props} className={classArr.join(' ')}>
            {children}
        </textarea>
    );
};

export default MyTextArea;