import api from '../api/axiosApi.tsx';


interface AuthResponse {
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}


export const autenticacao = async (email: string, password: string): Promise<string> => {
    try {
        const requestData: LoginRequest = { email, password };

        const response = await api.post<LoginRequest>('/login', JSON.stringify(requestData));

        const token = response.data.token;

        return token;
        
    } catch (error) {
        console.log('login falhou', error);
    }
}