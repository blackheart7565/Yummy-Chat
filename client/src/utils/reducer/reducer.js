import {
    ADD_CHANNEL,
    ADD_CURRENT_USERS,
    ADD_USERS,
    ADD_USERS_IN_CHANNEL,
    ADDING_MESSAGE,
    SET_CURRENT_CHANNEL
} from "./const-reducer";

const defaultChannel = {
    channels: []
    , users: [
        {
            id: 1,
            username: 'admin',
            email: 'a',
            phone: '+38014475185625',
            password: 'a',
        },
        {
            id: 2,
            username: 'Sato',
            email: 's',
            phone: '+38014475185625',
            password: 's',
        }
    ]
    , currentChannelId: null
    , currentUser: null
}

const reducer = (state = defaultChannel, action) => {
    switch (action.type) {
        case ADD_CHANNEL: {
            return {
                ...state
                , channels: [...state.channels, action.payload]
            };
        }

        case SET_CURRENT_CHANNEL: {
            return {
                ...state
                , currentChannelId: action.payload
            };
        }

        case ADDING_MESSAGE: {
            const [channelId, message] = action.payload;
            console.log(message)
            return {
                ...state
                , channels: state.channels.map(channel =>
                    channel.id === channelId
                        ? {...channel, messages: [...channel.messages, message]}
                        : channel
                )
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

        default:
            return state;
    }
}

export default reducer;