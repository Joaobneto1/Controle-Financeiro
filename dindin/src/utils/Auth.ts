import { getItem } from "../api/axiosApi";


interface User {
    token: string;
    nome: string;
    id: string;
}


export const getUser = (): User | null => {
    const conta = getItem("conta");
    return conta ? JSON.parse(conta) : null;
}


export const getToken = (): string | null => {
    const user = getUser();
    return user ? user.token : null;
}