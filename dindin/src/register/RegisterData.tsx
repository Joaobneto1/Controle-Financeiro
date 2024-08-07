import api from '../api/axiosApi.tsx';

interface RegisterData {
    nome: string;
    email: string;
    senha: string;
}

interface RegisterResponse {
    id: number;
    nome: string;
    email: string;
}

export const registerUser = async (nome: string, email: string, senha: string): Promise<RegisterResponse | undefined> => {
    try {
        const requestRegister: RegisterData = {nome, email, senha};

        const response = await api.post<RegisterResponse>('/usuario', requestRegister);

        return response.data;
    } catch (error) {
        console.log('Falha no cadastro', error);
        return undefined;
    }
}