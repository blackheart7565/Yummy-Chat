import {ADD_CURRENT_USERS, ADD_USERS, ADD_USERS_IN_CHANNEL, IS_LOGIN} from "../const-reducer";

const defaultUser = {
    currentUser: null
    , isLogin: false
}

export const userReducer = (state = defaultUser, action) => {
    switch (action.type) {

        case ADD_USERS: {
            return {
                ...state
                , users: [...state.users, action.payload]
            }
        }

        case ADD_CURRENT_USERS: {
            return {
                ...state
                , currentUser: action.payload
            }
        }

        case IS_LOGIN: {
            return {
                ...state
                , isLogin: action.payload
            }
        }


        // ????????????????????????
        case ADD_USERS_IN_CHANNEL: {
            const [channelId, user] = action.payload;
            return {
                ...state
                , channels: state.channels.map(channel =>
                    channel.id === channelId
                        ? {...channel, users: [...channel.users, user]}
                        : channel
                )
            };
        }


        default:
            return state;
    }
}