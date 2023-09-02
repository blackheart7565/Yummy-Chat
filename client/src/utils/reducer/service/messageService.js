import {MESSAGE_PAGINATION, ADD_NEW_MESSAGE, SET_MESSAGE_TO_CURRENT_CHANNEL} from "../const-reducer";

class MessageService {

    /**
     * Метод для добавления нового сообщения в существуюший канал
     * @param {Number} channelId уникальный индиыфикатор канала
     * @param {Object} data обьект сообщения
     * */
    addNewMessage = (channelId, data) => {
        return {
            type: ADD_NEW_MESSAGE
            , payload: {
                channelId
                , data
            }
        }
    }

    // пагинация
    /**
     @param {Number} channelId уникальный индиыфикатор канала
     @param {Array} data массив данных
     * */
    messagePagination = (channelId, data) => {
        return {
            type: MESSAGE_PAGINATION
            , payload: {
                channelId
                , data
            }
        }
    }

    /**
     * Метод длл записи сообщений канала
     * @param {Number} channelId уникальный индиыфикатор канала
     * @param {Array} data массив данных
     * */
    loadingMessageToCurrentChannel = (channelId, data) => {
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
