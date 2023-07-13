import React, {useState} from 'react';
import "./styles/App.scss";
import Authorization from "./component/Authorization";
import Chat from "./component/Chat";

const App = () => {
    const [isConnection, setIsConnection] = useState(true);


    return (
        <div className='App'>
            {isConnection
                ? <Chat/>
                : <Authorization/>
            }
        </div>
    );
};

export default App;