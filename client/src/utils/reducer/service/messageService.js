import {
    MESSAGE_PAGINATION,
    ADD_NEW_MESSAGE,
    SET_MESSAGE_TO_CURRENT_CHANNEL,
    PAGE_MASSAGE,
    INITIALIZATION_BLOCK_MESSAGE
} from "../const-reducer";

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

    /**
     * Метод для сохранения номера страницы во время пагинации
     @param {Number} channelId уникальный индиыфикатор канала
     @param {Number} page номер страницы подгрузки пагинации сообщений
     * */
    setPageMessage = (channelId, page = 1) => {
        return {
            type: PAGE_MASSAGE
            , payload: {
                channelId
                , page
            }
        }
    }

    /**
     * Метод для блокировки первой инициализации сообщений текущего канала
     @param {Number} channelId уникальный индиыфикатор канала
     @param {Boolean} isBlockLoadMess флаг состояния
     * */
    setInitializationBlockMess = (channelId, isBlockLoadMess) => {
        return {
            type: INITIALIZATION_BLOCK_MESSAGE
            , payload: {
                channelId
                , isBlockLoadMess
            }
        }
    }
}

export default new MessageService();
