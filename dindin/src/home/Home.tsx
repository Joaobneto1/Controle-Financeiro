import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import '../global.css';
import axios from "axios";
import { FilterButton } from "../components/filterButton/filtroButton";
import { getToken } from "../utils/Auth.ts"; 
import { Transacao } from "../interfaces/interfaces";
import { Tabela } from "../components/table/tabela";
import { RegistrarModal } from "../components/registerModal/registrarModal";
import { EditarRegistroModal } from "../components/editRegisterModal/editarModalRegistro";
import { Header } from "../components/header/Header";
import { ResumoT } from "../components/resumoTrans/resumoT.tsx";

export const Home = () => {
    const [addRegister, setAddRegister] = useState<boolean>(false);
    const [editRegister, setEditRegister] = useState<boolean>(false);
    const [currentRegister, setCurrentRegister] = useState<Transacao | undefined>(undefined);
    const [transaction, setTransaction] = useState<Transacao[]>([]);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if (!token) {
            navigate("/login");
        } else {
            fetchTransacoes(token);
        }
    }, [navigate]);

    const fetchTransacoes = async (token: string) => {
        try {
            const response = await axios.get(
                "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTransaction(response.data);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
        }
    };

    const handleNewTransaction = () => {
        const token = getToken(); 
        if (token) {
            fetchTransacoes(token);
        }
    };

    const handleUpdateTransaction = () => {
        const token = getToken(); 
        if (token) {
            fetchTransacoes(token);
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="home_backg">
            <Header loggedIn={true} />
            <main className="home_principal">
                <div className="descricao_container">
                    <FilterButton filterB={toggleFilters} />
                    {showFilters && (
                        <div>Conteúdo dos filtros</div> 
                    )}
                    <div className="descricao">
                        <Tabela
                            transacao={transaction}
                            setTransacao={setTransaction}
                            setCurrentRegister={setCurrentRegister}
                            setEditRegister={setEditRegister}
                        />
                        <div className="resumo_container">
                            <ResumoT transacao={transaction} />
                            <button onClick={() => setAddRegister(true)}>
                                Adicionar Registro
                            </button>
                            <RegistrarModal
                                show={addRegister}
                                onClose={() => setAddRegister(false)}
                                onNewTransaction={handleNewTransaction}
                            />
                            {editRegister && (
                                <EditarRegistroModal
                                    show={editRegister}
                                    onClose={() => setEditRegister(false)}
                                    onUpdate={handleUpdateTransaction}
                                    currentRegister={currentRegister}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};