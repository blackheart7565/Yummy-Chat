import {ADD_MANY_MESSAGE, ADDING_MESSAGE} from "../const-reducer";

class MessageService {

    addNewMessage = (message) => {
        return {
            type: ADDING_MESSAGE
            , payload: message
        }
    }

    addManyMessage = (messages) => {
        return {
            type: ADD_MANY_MESSAGE
            , payload: messages
        }
    }
}

export default new MessageService();
