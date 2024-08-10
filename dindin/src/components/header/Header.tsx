import { useEffect, useState } from "react";
import { getItem, removeItem } from "../../api/axiosApi";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.svg"
import iconSair from "../../../assets/iconSair.svg";
import iconPerfil from "../../../assets/iconPerfil.svg";
import "../../global.css";
import "./Header.css";
import { HeaderProps } from "../../interfaces/interfaces";

export const Header = ({ loggedIn }: HeaderProps) => {
    const [logout, setLogout] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const [name, setName] = useState<string>(getItem("name") || "");

    useEffect(() => {
        if (logout) {
            removeItem("token");
            removeItem("userId");
            removeItem("name");
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
                    <strong>{name}</strong>
                    <img src={iconSair} alt="Sair" onClick={() => setLogout(true)} />
                </div>
            )}
        </header>
    );
};