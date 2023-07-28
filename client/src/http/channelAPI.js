import {$authHost, $host} from "./index";


export const createChannel = async (channel) => {
    const {data} = await $authHost.post('/api/channel', channel);
    return data;
}

export const fetchUserChannel = async (userId) => {
    const {data} = await $authHost.get(`/api/channel`, {params: {userId}});
    return data;
}

export const fetchOneChannel = async (id) => {
    const {data} = await $host.get(`/api/channel/${id}`);
    return data
}
export const fetchAllChannel = async () => {
    const {data} = await $host.get(`/api/channel/all`);
    return data
}