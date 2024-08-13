import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosApi";
import Logo from '../../assets/Logo.svg';
import "./Register.css";

interface FormState {
    nome: string;
    email: string;
    senha: string;
    senhaRepetida: string;
}

export const Register = () => {
    const [form, setForm] = useState<FormState>({
        nome: '',
        email: '',
        senha: '',
        senhaRepetida: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (form.senha !== form.senhaRepetida) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const resposta = await api.post('/usuario', form);
            console.log(resposta.data);
            alert("Cadastro realizado com sucesso!");
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("Erro ao realizar cadastro. Tente novamente.");
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="registerContainer">
            <div className="header">
            <img className="logo" src={Logo} alt="logo" />
            </div>
            <div className="registerFormContainer">
                <form onSubmit={handleSubmit}>
                <label>Cadastre-se</label>
                    <h1>Nome</h1>
                    <input
                        type="text"
                        name="nome"
                        required
                        value={form.nome}
                        onChange={handleOnChange}
                    />
                    <br />
                    <h1>E-mail</h1>
                    <input
                        type="text"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleOnChange}
                    />
                    <br />
                    <h1>Senha</h1>
                    <input
                        type="password"
                        name="senha"
                        required
                        value={form.senha}
                        onChange={handleOnChange}
                    />
                    <br />
                    <h1>Confirmação de senha</h1>
                    <input
                        type="password"
                        name="senhaRepetida"
                        required
                        value={form.senhaRepetida}
                        onChange={handleOnChange}
                    />
                    <button className="botaoRegistro" type="submit">Cadastrar</button>
                    <Link className="link" to='/login'>Já tem cadastro? Clique aqui!</Link>
                </form>
            </div>
        </div>
    );
};