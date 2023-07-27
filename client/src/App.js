import React from 'react';
import "./styles/App.scss";
import Chat from "./component/Chat";
import Authorization from "./component/Authorization";

const App = () => {
    return (
        <div className='App'>
            <Chat/>
        </div>
    );
};

export default App;