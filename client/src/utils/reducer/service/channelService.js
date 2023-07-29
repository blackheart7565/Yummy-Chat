import {
    ADD_CHANNEL, ADD_CHANNEL_IN_ALL_CHANNEL,
    ADD_CURRENT_CHANNEL,
    ADD_MANY_CHANNEL,
    GET_ALL_CHANNEL,
    SET_CURRENT_CHANNEL
} from "../const-reducer";

class ChannelService {

    addNewChannel = (channel) => {
        return {
            type: ADD_CHANNEL
            , payload: channel
        }
    }

    addNewManyChannel = (channels) => {
        return {
            type: ADD_MANY_CHANNEL
            , payload: channels
        }
    }

    addCurrentChannel = (channel) => {
        return {
            type: ADD_CURRENT_CHANNEL
            , payload: channel
        }
    }

    getAllChannel = (channels) => {
        return {
            type: GET_ALL_CHANNEL
            , payload: channels
        }
    }

    addChannelInAllChannel = (channel) => {
        return {
            type: ADD_CHANNEL_IN_ALL_CHANNEL
            , payload: channel
        }
    }

    setCurrentChannel = (channelId) => {
        return {
            type: SET_CURRENT_CHANNEL
            , payload: channelId
        }
    }
}

export default new ChannelService();