import st from './Connect.module.scss';
import React from 'react';

const Connect = ({children, ...props}) => {
    return (
        <div
            {...props}
            className={st.connect}
        >
            <span>{children}</span>
        </div>
    );
};

export default Connect;