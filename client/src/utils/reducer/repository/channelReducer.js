import {
    ADD_CHANNEL
    , ADD_CURRENT_CHANNEL
    , ADD_MANY_CHANNEL
    , GET_ALL_CHANNEL
    , SET_CURRENT_CHANNEL
} from "../const-reducer";

const defaultChannel = {
    channels: []
    , allChannels: []
    , currentChannelId: null
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