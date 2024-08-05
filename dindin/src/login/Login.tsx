import React, { useState } from "react";
import logo from '../../logo/Logo.svg';
import { autenticacao } from './autenticacao.tsx';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const token = await autenticacao(email, password);
            console.log('token:', token);

        } catch (error) {
            console.log('falha no login');
        }
    }

    return (
        <div className="container">
            <header>
            <img className="logo" src={logo} alt="logo" />
            </header>
            <div className="leftLogin">
            <p>
                <span>Controle suas<span className="topSpan" style={{ color: '#6460FB'}}> finanças</span>
                , sem planilha chata.</span>
                </p>
                <a>
                Organizar as suas finanças nunca foi tão fácil,
                     com o DINDIN, você tem tudo num único lugar e em um clique de distância.
                     </a>
                     <Link to="/Register">
                <button className="cadastroBotao">Cadastre-se</button>
                </Link>
            </div>
            <div className="rightLogin">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <h3>E-mail</h3>
                    <input type="email" onChange={(event) => setEmail(event.target.value)} required/>
                    <h3>Password</h3>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} required/>
                    <button className="loginBotao">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;