import {ADD_MANY_MESSAGE, ADDING_MESSAGE, SET_MESSAGE_TO_CURRENT_CHANNEL} from "../const-reducer";

class MessageService {

    /**
     * Метод для добавления нового сообщения в существуюший канал
     * @param {Number} channelId уникальный индиыфикатор канала
     * @param {Object} data обьект сообщения
     * */
    addNewMessage = (channelId, data) => {
        return {
            type: ADDING_MESSAGE
            , payload: {
                channelId
                , data
            }
        }
    }

    addManyMessage = (messages) => {
        return {
            type: ADD_MANY_MESSAGE
            , payload: messages
        }
    }

    /**
     * Метод длл записи сообщений канала
     * @param {Number} channelId уникальный индиыфикатор канала
     * @param {Array} data массив данных
     * */
    setMessageToCurrentChannel = (channelId, data) => {
        return {
            type: SET_MESSAGE_TO_CURRENT_CHANNEL
            , payload: {
                channelId
                , data
            }
        }
    }
}

export default new MessageService();
