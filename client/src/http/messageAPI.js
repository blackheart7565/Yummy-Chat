import {$host} from "./index";

class MessageAPI {

    createMessage = async (message) => {
        const {data} = await $host.post('/api/message', message);
        return data;
    }

    fetchMoreMessages = async (channelId, olderMessageId) => {
        const {data} = await $host.get('/api/message', {
            params: {
                channelId,
                olderMessageId
            }
        })
        return data
    }
}

export default new MessageAPI();