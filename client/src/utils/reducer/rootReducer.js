import {combineReducers} from "redux";
import {userReducer} from "./repository/userReducer";
import {channelReducer} from "./repository/channelReducer";
import {messageReducer} from "./repository/messageReducer";

export const rootReducer = combineReducers({
    user: userReducer
    , channel: channelReducer
    , message: messageReducer
});