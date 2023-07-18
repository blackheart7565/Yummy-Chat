import {ADD_CHANNEL, ADD_USERS, ADDING_MESSAGE, SET_CURRENT_CHANNEL} from "./globalVars";

export const addNewChannel = (channel) => {
    return {
        type: ADD_CHANNEL
        , payload: channel
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

export const addUser = (user) => {
    return {
        type: ADD_USERS
        , payload: user
    }
}