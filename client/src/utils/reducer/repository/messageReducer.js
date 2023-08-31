import {ADD_MANY_MESSAGE, ADDING_MESSAGE, SET_MESSAGE_TO_CURRENT_CHANNEL} from "../const-reducer";

const defaultMessage = {
    messages: {}
}

export const messageReducer = (state = defaultMessage, action) => {
    switch (action.type) {

        // Добавление 1 сообщение в масив
        case ADDING_MESSAGE: {
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

        /*разварачиваем старые даные массива(обьекта) , и разворачиваем данные нового массива(обьекта) и соиденяем*/
        case ADD_MANY_MESSAGE: {
            return {
                ...state
                , messages: [...state.messages, ...action.payload]
            };
        }


        // установка массива сообщений
        case SET_MESSAGE_TO_CURRENT_CHANNEL: {
            const {channelId, data} = action.payload

            return {
                ...state
                , messages: {
                    [channelId]: {
                        data: data
                    }
                }
            }
        }

        default:
            return state;
    }
}