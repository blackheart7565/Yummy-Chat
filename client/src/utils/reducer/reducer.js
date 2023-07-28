import {
    ADD_CHANNEL, ADD_CURRENT_CHANNEL,
    ADD_CURRENT_USERS, ADD_MANY_CHANNEL,
    ADD_USERS,
    ADD_USERS_IN_CHANNEL,
    ADDING_MESSAGE, GET_ALL_CHANNEL, IS_LOGIN,
    SET_CURRENT_CHANNEL
} from "./const-reducer";

const defaultChannel = {
    channels: []
    , allChannels: []
    , currentChannelId: null
    , currentChannel: null

    , currentUser: null
    , isLogin: false
}

const reducer = (state = defaultChannel, action) => {
    switch (action.type) {
        case ADD_CHANNEL: {
            return {
                ...state
                , channels: [...state.channels, action.payload]
            };
        }
        case ADD_MANY_CHANNEL: {
            return {
                ...state
                , channels: [...state.channels, ...action.payload]
            };
        }
        case ADD_CURRENT_CHANNEL: {
            return {
                ...state
                , currentChannel: action.payload
            };
        }
        case GET_ALL_CHANNEL: {
            return {
                ...state
                , allChannels: action.payload
            }
        }



        case SET_CURRENT_CHANNEL: {
            return {
                ...state
                , currentChannelId: action.payload
            };
        }

        case ADDING_MESSAGE: {
            return {
                ...state
                , currentChannel: [...state.currentChannel.messages,  action.payload]
            };
        }

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

        case IS_LOGIN: {
            return {
                ...state
                , isLogin : action.payload
            }
        }

        default:
            return state;
    }
}

export default reducer;