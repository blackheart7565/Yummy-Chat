import {$authHost, $host} from "./index";


export const createChannel = async (channel) => {
    const {data} = await $authHost.post('/api/channel', channel);
    return data;
}

export const fetchUserChannel = async (userId) => {
    const {data} = await $host.get(`/api/channel`, {params: {userId}});
    return data;
}