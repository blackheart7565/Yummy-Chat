import st from './MySelect.module.scss';
import React, {forwardRef} from 'react';
import MyOption from "../MyOption/MyOption";
import {countries} from "../../API/сountry-сodes";


const MySelect = forwardRef((props, ref) => {
    const classArr = [st.select, props.className];

    /*
        const [countries, setCountries] = useState([]);

        useEffect(() => {
            ApiService.getQuery('https://countryapi.io/api/all?apikey=1eQiWxa4liKqbrklM4ekDtJScVeFzYS3u3TikAhe', (res) => {
                for (const country in res.data) {
                    setCountries(prevState => [...prevState, {
                        country
                        , callingCode: res.data[country].callingCode
                    }])
                }
            }).catch(error => {
                console.error('Error fetching countries:', error);
            });
        }, [])
    */

    return (
        <select
            {...props}
            ref={ref}
            className={classArr.join(' ')}
        >
            {
                countries.map(phone =>
                    <MyOption
                        key={phone.name}
                    >
                        {phone.dial_code}
                    </MyOption>
                )
            }
        </select>
    );
});

export default MySelect;