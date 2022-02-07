import axios from 'axios';

const APIInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const API = {
    get: APIInstance.get,
    post: APIInstance.post,
}