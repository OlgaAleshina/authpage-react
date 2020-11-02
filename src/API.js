
import axios from "axios";

const API = axios.create({
    baseURL: "https://reqres.in/",
    headers: {
        "Content-type": "application/json"
    }
});

export const loginRequest = (params) => API.post('/api/login', params);

export const registerRequest = (params) => API.post('/api/register', params);

export const getUserList = (page) => API.get(`/api/users?page=${page}`);