import axios from "axios";

export const API_BASE_URL = "http://localhost:5533";


export const getAuthToken = () => {
    return window.localStorage.getItem('token');
}

export const setAuthToken = (token: string) => {
    return window.localStorage.setItem("token", token);
}

const token = getAuthToken();

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

