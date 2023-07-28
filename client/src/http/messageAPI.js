import {$host} from "./index";

export const createMessage = async (message) => {
    const {data} = await $host.post('/api/message', message);
    return data;
}
