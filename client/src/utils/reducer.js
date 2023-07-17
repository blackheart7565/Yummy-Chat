import {ADD_CHANNEL, ADDING_MESSAGE, GET_MESSAGE, SET_CURRENT_CHANNEL} from "./globalVars";

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
            };

        case ADDING_MESSAGE:
            const [channelId, message] = action.payload;
            return {
                ...state
                , channels: state.channels.map(channel =>
                    channel.id === channelId
                        ? {...channel, messages: [...channel.messages, message]}
                        : channel
                )
            };

        default:
            return state;
    }
}

export default reducer;