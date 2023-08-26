import React, {forwardRef} from 'react';

const MyTextArea = forwardRef(({children, ...props}, ref) => {
    return (
        <textarea
            ref={ref}
            {...props}
        >
            {children}
        </textarea>
    );
});

export default MyTextArea;