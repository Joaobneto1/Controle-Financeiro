import React from "react";
import iconPerfil from "../../../assets/iconPerfil.svg";
import Logo from "../../../assets/Logo.svg";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { DeslogarHeader } from "../deslogarHeader/deslogarHeader";

export const Header: React.FC = () => {
    const currentLocation = useLocation();

    const isAuthenticationRoute =
        currentLocation.pathname === "/Login" || currentLocation.pathname === "/Register";

    const storedUser = localStorage.getItem("user");
    const displayName = storedUser ? JSON.parse(storedUser).nome : "";

    return (
        <header className="headerBackground">
            <div className="logoContainer">
                <img src={Logo} alt="Logo" />
                <p className="logoText">Dindin</p>
            </div>
            {!isAuthenticationRoute && (
                <div className="userSection">
                    <img
                        className="iconMargin"
                        src={iconPerfil}
                        alt="User Icon"
                    />
                    <p className="iconMargin">{displayName}</p>
                    <DeslogarHeader />
                </div>
            )}
        </header>
    );
};