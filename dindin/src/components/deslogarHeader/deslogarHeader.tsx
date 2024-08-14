import React from "react";
import iconSair from "../../../assets/iconSair.svg";
import "./deslogarHeader.css";
import { useNavigate } from "react-router-dom";

export const DeslogarHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        navigate("/Register");
    };

    return (
        <button className="logout_btn" onClick={handleLogout}>
            <img src={iconSair} alt="Sair" />
        </button>
    );
};