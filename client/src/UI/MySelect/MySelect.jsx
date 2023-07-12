import sel from './MySelect.module.scss';
import React from 'react';
import auth from "../../styles/Authorization.module.scss";
import MyOption from "../MyOption/MyOption";
import phoneList from "../../utils/phone-list";


const MySelect = (props) => {
    const classArr = [sel.select, props.className];

    return (
        <select {...props} className={classArr.join(' ')}>
            {
                phoneList.map(phone =>
                    <MyOption className={auth.auth__phoneOption} value="">
                        {`+${phone}`}
                    </MyOption>
                )
            }
        </select>
    );
};

export default MySelect;