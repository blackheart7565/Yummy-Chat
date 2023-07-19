import axios from "axios";

class ApiService {

    async getQuery(url, callback) {
        await axios.get(url)
            .then(callback);
    }
}

export default new ApiService();