import {ADD_MANY_MESSAGE, ADDING_MESSAGE} from "../const-reducer";

const defaultMessage = {
    messages: []
}

export const messageReducer = (state = defaultMessage, action) => {
    switch (action.type) {

        case ADDING_MESSAGE: {
            return {
                ...state
                , messages: [...state.messages, action.payload]
            };
        }

        case ADD_MANY_MESSAGE: {
            return {
                ...state
                , messages: [...state.messages, ...action.payload]
            };
        }

        default:
            return state;
    }
}