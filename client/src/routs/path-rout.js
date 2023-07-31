import Chat from "../pages/Chat";
import Authorization from "../pages/Authorization";
import Registration from "../pages/Registration";
import {CHAT_PATH, LOGIN_PATH, REGISTRATION_PATH} from "../utils/const-vars";

export const authRouter = [
    {
        path: CHAT_PATH
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