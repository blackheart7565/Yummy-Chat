import {$host} from "./index";

class MessageAPI {

    createMessage = async (message) => {
        const {data} = await $host.post('/api/message', message);
        return data;
    }
}

export default new MessageAPI();