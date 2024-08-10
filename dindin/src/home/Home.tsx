import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import '../global.css'
import axios from "axios";
import { FilterButton } from "../components/filterButton/filtroButton"
import { getItem } from "../api/axiosApi";
import { Transacao } from "../interfaces/interfaces";
import { Tabela } from "../components/table/tabela";
import { RegistrarModal } from "../components/registerModal/registrarModal";
import { EditarRegistroModal } from "../components/editRegisterModal/editarModalRegistro";
import { Header } from "../components/header/Header";




export const Home = () => {
    const [addRegister, setAddRegister] = useState<boolean>(false);
    const [editRegister, setEditRegister] = useState<boolean>(false);
    const [currentRegister, setCurrentRegister] = useState<Transacao | undefined>(undefined);
    const [transacao, setTransacao] = useState<Transacao[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        fetchTransacoes();
    }, []);

    const fetchTransacoes = async () => {
        const token = getItem("token");
        try {
            const response = await axios.get(
                "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTransacao(response.data);
        } catch (error) {
            console.error("Erro ao buscar transaçãos:", error);
        }
    };

    const handleNewTransaction = () => {
        fetchTransacoes();
    };

    const handleUpdateTransaction = () => {
        fetchTransacoes();
    };
}; 
