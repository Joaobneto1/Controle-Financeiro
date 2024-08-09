import api from '../api/axiosApi.tsx';


interface AuthResponse {
    usuario: {
        id: number;
        nome: string;
        email: string;
    };
    token: string;
}

interface LoginRequest {
    email: string;
    senha: string;
}


export const autenticacao = async (email: string, senha: string): Promise<string | undefined> => {
    try {
        const requestData: LoginRequest = { email, senha };

        const response = await api.post<AuthResponse>('/login', requestData);

        return response.data.token;

    } catch (error) {
        console.log('login falhou', error);
        return undefined;
    }
}