<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { removeItem } from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.svg";
import iconSair from "../../../assets/iconSair.svg";
import iconPerfil from "../../../assets/iconPerfil.svg";
import "../../global.css";
import "./Header.css";
import { HeaderProps } from "../../interfaces/interfaces";
import { getToken } from "../../utils/Auth";

export const Header = ({ loggedIn }: HeaderProps) => {
    const [logout, setLogout] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>(localStorage.getItem("nome") || "");

    useEffect(() => {
        if (logout) {
            removeItem("token");
            removeItem("userId");
            removeItem("nome");
            navigate("/");
        }
    }, [logout, navigate]);
=======
import React from "react";
import iconPerfil from "../../../assets/iconPerfil.svg";
import logo from "../../../assets/Logo.svg";
import { useLocation } from "react-router-dom";
import "./Header.css"
import { DeslogarHeader } from "../deslogarHeader/deslogarHeader";

export const Header: React.FC = () => {
    const currentPath = useLocation();

    const isAuthenticationPage =
        currentPath.pathname === "/login" || currentPath.pathname === "/register";
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513

    const storedUser = localStorage.getItem("user");
    const displayName = storedUser ? JSON.parse(storedUser).nome : "";

    return (
<<<<<<< HEAD
        <header>
            <img src={Logo} alt="logo" style={{ width: "169px", height: "45px" }} />
            {loggedIn && (
                <div className="perfil_area">
                    <img src={iconPerfil} alt="Perfil" className="perfil_pic" onClick={handleProfilePicClick} />
                    <strong>{nome}</strong>
                    <img src={iconSair} alt="Sair" onClick={() => setLogout(true)} />
=======
        <header className="background_header">
            <div className="logo_container">
                <img src={logo} alt="Logo" />
                <p className="logo_name">Dindin</p>
            </div>
            {!isAuthenticationPage && (
                <div className="header_icons">
                    <img
                        className="itens_espaço"
                        src={iconPerfil}
                        alt="Ícone do usuário"
                    />
                    <p className="itens_espaço">{displayName}</p>
                    <DeslogarHeader />
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513
                </div>
            )}
        </header>
    );
};