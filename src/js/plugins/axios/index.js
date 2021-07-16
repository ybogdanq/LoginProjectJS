import axios from "axios";
import API_ENW from "../../config/api.config";
import interceptors from "./interceptors";

const instance = axios.create({
    baseURL: API_ENW.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

interceptors(instance);

export default instance;