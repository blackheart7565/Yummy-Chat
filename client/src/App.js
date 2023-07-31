import React from 'react';
import "./styles/App.scss";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
};

export default App;