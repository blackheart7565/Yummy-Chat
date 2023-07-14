import sel from './MySelect.module.scss';
import React, {forwardRef} from 'react';
import auth from "../../styles/module/Authorization.module.scss";
import MyOption from "../MyOption/MyOption";
import phoneList from "../../utils/phone-list";


const MySelect = forwardRef((props, ref) => {
    const classArr = [sel.select, props.className];

    return (
        <select
            {...props}
            ref={ref}
            className={classArr.join(' ')}
        >
            {
                phoneList.map(phone =>
                    <MyOption
                        className={auth.auth__phoneOption}
                        key={phone.internationalCountryCodes}
                    >
                        {`+${phone.internationalCountryCodes}`}
                    </MyOption>
                )
            }
        </select>
    );
});

export default MySelect;