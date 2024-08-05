import React, { useState } from "react";
import logo from '../../logo/Logo.svg';
import { Link } from 'react-router-dom';
import "./Register.css";

const Register: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

    }


    return (
        <div className="container">
            <header>
            <img className="logo" src={logo} alt="logo" />
            </header>
            <div className="register">
                <h2>Cadastre-se</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Nome</h3>
                    <input type="text" onChange={(event) => setName(event.target.value)} required/>
                    <h3>E-mail</h3>
                    <input type="email" onChange={(event) => setEmail(event.target.value)} required/>
                    <h3>Senha</h3>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} required/>
                    <h3>Confirmação de Senha</h3>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} required/>
                    <button className="cadastroBotao" onClick={handleSubmit}>Cadastrar</button>
                </form>
                <Link to="/login" className="link">Já tem cadastro? Clique aqui!</Link>
            </div>
        </div>
    )
}

export default Register;