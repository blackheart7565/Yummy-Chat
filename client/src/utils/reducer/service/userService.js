import {ADD_CURRENT_USERS, ADD_USERS_IN_CHANNEL, IS_LOGIN} from "../const-reducer";

class UserService {

    addCurrentUser = (currentUser) => {
        return {
            type: ADD_CURRENT_USERS
            , payload: currentUser
        }
    }

    addUserInChannel = (channelId, user) => {
        return {
            type: ADD_USERS_IN_CHANNEL
            , payload: [
                channelId
                , user
            ]
        }
    }

    toggleIsLogin = (flag) => {
        return {
            type: IS_LOGIN
            , payload: flag
        }
    }
}

export default new UserService();
