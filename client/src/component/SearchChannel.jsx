import st from '../styles/module/SearchChannel.module.scss';
import React from 'react';
import MyInput from "../UI/MyInput/MyInput";

const SearchChannel = ({search, setSearch}) => {
    return (
        <div className={st.searchChannel}>
            <div className={st.searchChannel__inputSection}>
                <MyInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={st.searchChannel__input}
                    placeholder={'Search...'}
                />
            </div>
        </div>
    );
};

export default SearchChannel;