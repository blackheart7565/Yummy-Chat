import {$authHost, $host} from "./index";


export const createChannel = async (channel) => {
    const {data} = await $authHost.post('/api/channel', channel);
    return data;
}

export const fetchChannel = async (channel) => {
    const {data} = await $authHost.get('/api/channel', channel);
    return data;
}