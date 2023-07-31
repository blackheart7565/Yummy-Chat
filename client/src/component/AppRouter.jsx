import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useRedux} from "../hook/redux";
import {authRouter, routs} from "../routs/path-rout";
import {CHAT_PATH, LOGIN_PATH} from "../utils/const-vars";

const AppRouter = () => {
    const {user} = useRedux();
    console.log(user)

    return (
        <Routes>
            {
                user.isLogin
                    ? (
                        authRouter.map(({path, element}) =>
                            <Route
                                key={path}
                                path={path}
                                element={element}
                            />
                        )
                    )
                    : (
                        routs.map(({path, element}) =>
                            <Route
                                key={path}
                                path={path}
                                element={element}
                            />
                        )
                    )
            }
            <Route path={'/'} element={<Navigate to={LOGIN_PATH}/>}/>
            <Route path={'/*'} element={<Navigate to={user.isLogin ? CHAT_PATH : LOGIN_PATH}/>}/>
        </Routes>
    );
};

export default AppRouter;