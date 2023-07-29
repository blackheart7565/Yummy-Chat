import {ADD_CURRENT_USERS, IS_LOGIN} from "../const-reducer";

class UserService {

    addCurrentUser = (currentUser) => {
        return {
            type: ADD_CURRENT_USERS
            , payload: currentUser
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
