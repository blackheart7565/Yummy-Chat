import textarea from './MyTextArea.module.scss';
import React, {forwardRef} from 'react';

const MyTextArea = forwardRef(({children, ...props}, ref) => {
    const classArr = [textarea.textArea, props.className];

    return (
        <textarea
            {...props}
            ref={ref}
            className={classArr.join(' ')}
        >
            {children}
        </textarea>
    );
});

export default MyTextArea;