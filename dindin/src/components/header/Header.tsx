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

    const storedUser = localStorage.getItem("user");
    const displayName = storedUser ? JSON.parse(storedUser).nome : "";

    return (
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
                </div>
            )}
        </header>
    );
};