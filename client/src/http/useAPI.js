import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

class UseAPI {
    registration = async ({avatar, username, email, phone, password}) => {
        const {data} = await $host.post('/api/user/registration', {
            avatar
            , username
            , email
            , phone
            , password
        });
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }

    login = async (email, password) => {
        const {data} = await $host.post('/api/user/login', {email, password})
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }

    check = async () => {
        const {data} = await $authHost.get('/api/user/auth');
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }
}

export default new UseAPI();