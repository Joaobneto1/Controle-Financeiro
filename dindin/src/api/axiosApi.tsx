import axios from 'axios';

export const Api_Url = "https://desafio-backend-03-dindin.pedagogico.cubos.academy";

const token = localStorage.getItem("token");

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

export const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value
};

export const removeItem = (key: string) => {
    localStorage.removeItem(key);
};

export const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const Endpoints = {
    user: `${Api_Url}/usuario`,
    login: `${Api_Url}/login`,
    category: `${Api_Url}/categoria`,
    transaction: `${Api_Url}/transacao`,
    statement: `${Api_Url}/transacao/extrato`,
}

export default api;