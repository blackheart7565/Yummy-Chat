import {
    ADD_CHANNEL,
    ADD_CURRENT_CHANNEL,
    ADD_MANY_CHANNEL,
    IS_CLOSE_ACTIVE,
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

    setCurrentChannel = (channelId) => {
        return {
            type: SET_CURRENT_CHANNEL
            , payload: channelId
        }
    }

    toggleCloseActive = () => {
        return {
            type: IS_CLOSE_ACTIVE
        }
    }
}

export default new ChannelService();