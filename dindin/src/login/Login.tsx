import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/Logo.svg';
import api from "../api/axiosApi";
import "./Login.css";

export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/login', { email, senha });

            const usuario = response.data;

            localStorage.setItem('conta', JSON.stringify(usuario));
            setErrorMessage("");
            navigate('/Home');

        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Email ou senha incorretos.");
            } else {
                setErrorMessage("Erro ao realizar login. Tente novamente.");
            }
            console.error(error);
        }
    };

    return (
        <div className="loginContainer">
            <div className="header">
                <img className="logo" src={Logo} alt="logo" />
            </div>
            <div className="leftLogin">
                <p>
                    <span>Controle suas<span className="topSpan" style={{ color: '#6460FB' }}> finanças</span>, sem planilha chata.</span>
                </p>
                <a>
                    Organizar as suas finanças nunca foi tão fácil,
                    com o DINDIN, você tem tudo num único lugar e em um clique de distância.
                </a>
                <Link to="/Register">
                    <button className="cadastroBotao">Cadastre-se</button>
                </Link>
            </div>
            <div className="rightFormContainer">
                <form onSubmit={handleSubmit} className="loginForm">
                    <label>Login</label>
                    <br />
                    <h1>Login</h1>
                    <input
                        type="text"
                        name="email"
                        className="loginInput"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />

                    <br />
                    <h1>Password</h1>
                    <input
                        type="password"
                        name="senha"
                        className="loginInput"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <br />
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    <button className="botaoLogin" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};