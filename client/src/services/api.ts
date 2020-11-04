import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8091"
})

export default api