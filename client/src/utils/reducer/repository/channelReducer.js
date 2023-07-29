import {
    ADD_CHANNEL, ADD_CHANNEL_IN_ALL_CHANNEL
    , ADD_CURRENT_CHANNEL
    , ADD_MANY_CHANNEL
    , GET_ALL_CHANNEL
    , SET_CURRENT_CHANNEL
} from "../const-reducer";

const defaultChannel = {
    // каналы пользователей
    channels: []
    // все каналы всех пользователей
    , allChannels: []
    // текущий id текущеного канала
    , currentChannelId: null
    // текущий канал
    , currentChannel: null
}

export const channelReducer = (state = defaultChannel, action) => {
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

        case ADD_CHANNEL_IN_ALL_CHANNEL: {
            return {
                ...state
                , allChannels: [...state.allChannels, action.payload]
            }
        }

        case SET_CURRENT_CHANNEL: {
            return {
                ...state
                , currentChannelId: action.payload
            };
        }

        default:
            return state;
    }
}