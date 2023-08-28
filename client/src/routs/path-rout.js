import React from "react";
// import Chat from "../pages/Chat";
import Chat from "../pages/modules/Chat/Chat";
import Authorization from "../pages/Authorization";
import Registration from "../pages/Registration";
import {CHAT_PATH, LOGIN_PATH, REGISTRATION_PATH} from "../utils/const-vars";

export const authRouter = [
    {
        path: CHAT_PATH
        , element: <Chat/>
    },
    {
        path: `${CHAT_PATH}:id`
        , element: <Chat/>
    }
]

export const routs = [
    {
        path: LOGIN_PATH
        , element: <Authorization/>
    },
    {
        path: REGISTRATION_PATH
        , element: <Registration/>
    }
]