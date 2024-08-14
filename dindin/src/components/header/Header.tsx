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

    const handleProfilePicClick = () => {
        setShowEditModal(true);
    };

    return (
        <header>
            <img src={Logo} alt="logo" style={{ width: "169px", height: "45px" }} />
            {loggedIn && (
                <div className="perfil_area">
                    <img src={iconPerfil} alt="Perfil" className="perfil_pic" onClick={handleProfilePicClick} />
                    <strong>{nome}</strong>
                    <img src={iconSair} alt="Sair" onClick={() => setLogout(true)} />
                </div>
            )}
        </header>
    );
};