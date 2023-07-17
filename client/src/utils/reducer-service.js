import {ADD_CHANNEL, ADDING_MESSAGE, SET_CURRENT_CHANNEL} from "./globalVars";

export const addNewChannel = (channelName, User) => {
    return {
        type: ADD_CHANNEL
        , payload: {
            id: Date.now()
            , displayNameChannel: channelName
            , messages: []
            , users: [{
                usernameUser: User.username
                , phoneUser: User.phone
            }]
        }
    }
}

export const addNewMessage = (channelId, message) => {
    return {
        type: ADDING_MESSAGE
        , payload: [
            channelId
            , message
        ]
    }
}


export const setCurrentChannel = (channelId) => {
    return {
        type: SET_CURRENT_CHANNEL
        , payload: channelId
    }
}
