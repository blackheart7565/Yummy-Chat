import {$authHost, $host} from "./index";


class ChannelAPI {

    createChannel = async (channel) => {
        const {data} = await $authHost.post('/api/channel', channel);
        return data;
    }

    fetchUserChannel = async (userId) => {
        const {data} = await $authHost.get(`/api/channel`, {params: {userId}});
        return data;
    }

    fetchOneChannel = async (id) => {
        const {data} = await $host.get(`/api/channel/${id}`);
        return data
    }

    fetchAllChannel = async () => {
        const {data} = await $host.get(`/api/channel/all`);
        return data
    }

    addUserToChannelAPI = async (userId, channelId) => {
        const {data} = await $host.post(`/api/channel/connect`, {userId, channelId});
        return data
    }
}

export default new ChannelAPI();