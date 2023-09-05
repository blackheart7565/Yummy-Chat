import {
    MESSAGE_PAGINATION,
    ADD_NEW_MESSAGE,
    SET_MESSAGE_TO_CURRENT_CHANNEL,
    PAGE_MASSAGE,
    INITIALIZATION_BLOCK_MESSAGE
} from "../const-reducer";

const defaultMessage = {
    messages: {}
}

/*
messages: {
    [channelId]: {
        data: []
        , page: 1
        , isBlockLoadMess: false
    }
}
*/

export const messageReducer = (state = defaultMessage, action) => {
    switch (action.type) {

        // Добавление 1 сообщение в масив
        case ADD_NEW_MESSAGE: {
            const {channelId, data} = action.payload;

            return {
                ...state
                , messages: {
                    ...state.messages,
                    [channelId]: {
                        ...state.messages[channelId],
                        data: [...state.messages[channelId].data, data]
                    }
                }
            };
        }

        /*разварачиваем старые даные массива(обьекта)
        , и разворачиваем данные нового массива(обьекта) и соиденяем*/
        case MESSAGE_PAGINATION: {
            const {channelId, data} = action.payload;

            return {
                ...state
                , messages: {
                    ...state.messages,
                    [channelId]: {
                        ...state.messages[channelId],
                        data: [...data, ...state.messages[channelId].data]
                    }
                }
            };
        }

        // установка массива сообщений
        case SET_MESSAGE_TO_CURRENT_CHANNEL: {
            const {channelId, data} = action.payload

            return {
                ...state
                , messages: {
                    [channelId]: {
                        data: data,
                        page: 1,
                        isBlockLoadMess: true
                    },
                    ...state.messages
                }
            }
        }

        case PAGE_MASSAGE: {
            const {channelId, page} = action.payload

            return {
                ...state
                , messages: {
                    ...state.messages,
                    [channelId]: {
                        ...state.messages[channelId],
                        page: page
                    }
                }
            }
        }

        case INITIALIZATION_BLOCK_MESSAGE: {
            const {channelId, isBlockLoadMess} = action.payload;

            return {
                ...state
                , messages: {
                    [channelId]: {
                        ...state.messages[channelId]
                        , data: []
                        , page: 1
                        , isBlockLoadMess: isBlockLoadMess
                    }
                }
            }
        }

        default:
            return state;
    }
}