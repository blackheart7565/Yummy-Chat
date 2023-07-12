import React, {useState} from 'react';
import "./styles/App.scss";
import Authorization from "./component/Authorization";

const App = () => {
    const [isConnection, setIsConnection] = useState(false);

    return (
        <div className='App'>
            <Authorization/>
        </div>
    );
};

export default App;