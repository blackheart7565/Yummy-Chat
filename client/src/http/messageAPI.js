import {$host} from "./index";

class MessageAPI {

    createMessage = async (message) => {
        const {data} = await $host.post('/api/message', message);
        return data;
    }

    allMessages = async (channelId, page = 0, limit = 20) => {
        const {data} = await $host.get(`/api/message?channelId=${channelId}&limit=${limit}&page=${page}`)
        return data
    }
}

export default new MessageAPI();