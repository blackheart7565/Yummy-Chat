import {ADD_CHANNEL, SET_CURRENT_CHANNEL} from "./globalVars";

const defaultChannel = {
    channels: [],
    currentChannelId: null,
}

const reducer = (state = defaultChannel, action) => {
    switch (action.type) {
        case ADD_CHANNEL:
            return {
                ...state
                , channels: [...state.channels, action.payload]
            };
        case SET_CURRENT_CHANNEL:
            return {
                ...state
                , currentChannelId: action.payload
            }

        default:
            return state;
    }
}

export default reducer;