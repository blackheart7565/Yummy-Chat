import {
    ADD_CHANNEL,
    ADD_CURRENT_USERS,
    ADD_USERS,
    ADD_USERS_IN_CHANNEL,
    ADDING_MESSAGE,
    SET_CURRENT_CHANNEL
} from "../globalVars";

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