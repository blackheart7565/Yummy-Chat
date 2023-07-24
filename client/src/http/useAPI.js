import {$host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async ({avatar, username, email, phone, password}) => {
    const {data} = await $host.post('/api/user/registration', {
        avatar
        , username
        , email
        , phone
        , password
    });

    return jwt_decode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('/api/user/login', {email, password})
    return jwt_decode(data.token);
}

export const check = async () => {
    return await $host.get('/api/user/auth');
}