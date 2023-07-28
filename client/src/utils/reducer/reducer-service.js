import {
    ADD_CHANNEL, ADD_CURRENT_CHANNEL,
    ADD_CURRENT_USERS, ADD_MANY_CHANNEL, ADD_USERS_IN_CHANNEL,
    ADDING_MESSAGE, GET_ALL_CHANNEL, IS_LOGIN,
    SET_CURRENT_CHANNEL
} from "./const-reducer";

export const addNewChannel = (channel) => {
    return {
        type: ADD_CHANNEL
        , payload: channel
    }
}

export const addNewManyChannel = (channels) => {
    return {
        type: ADD_MANY_CHANNEL
        , payload: channels
    }
}

export const addCurrentChannel = (channel) => {
    return {
        type: ADD_CURRENT_CHANNEL
        , payload: channel
    }
}
export const getAllChannel = (channels) => {
    return {
        type: GET_ALL_CHANNEL
        , payload: channels
    }
}


export const addNewMessage = (message) => {
    return {
        type: ADDING_MESSAGE
        , payload:  message
    }
}


export const setCurrentChannel = (channelId) => {
    return {
        type: SET_CURRENT_CHANNEL
        , payload: channelId
    }
}

export const addCurrentUser = (currentUser) => {
    return {
        type: ADD_CURRENT_USERS
        , payload: currentUser
    }
}

export const addUserInChannel = (channelId, user) => {
    return {
        type: ADD_USERS_IN_CHANNEL
        , payload: [
            channelId
            , user
        ]
    }
}


export const toggleIsLogin = (flag) => {
    return {
        type: IS_LOGIN
        , payload: flag
    }
}

