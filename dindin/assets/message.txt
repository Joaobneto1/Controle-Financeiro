import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosApi";
import { FilterButton } from "../components/filterButton/filtroButton";
import { Table } from "../components/table/tabela";
import { Resumo } from "../components/resumoTrans/resumoT";
import { AddModalRegister } from "../components/addRegisterModal/addModalRegistro";
import { EditModalRegister } from "../components/registerModal/registrarModaEdit";
import { Transaction } from "../interfaces/interfaces";
import "../global.css";
import "./Home.css";
import { getItem } from "../api/axiosApi";
import { Header } from "../components/header/Header";

export const Home = () => {
    const [addRegister, setAddRegister] = useState<boolean>(false);
    const [editRegister, setEditRegister] = useState<boolean>(false);
    const [currentRegister, setCurrentRegister] = useState<Transaction | undefined>(undefined);
    const [transaction, setTransaction] = useState<Transaction[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const conta = getItem("conta");
        const usuario = conta ? JSON.parse(conta) : null;
        const token = usuario?.token;

        if (!token) {
            navigate("/login");
        } else {
            fetchTransactions(token);
        }
    }, [navigate]);

    const fetchTransactions = async (token: string) => {
        try {
            const response = await api.get("https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const transactions = response.data.sort(
                (a: Transaction, b: Transaction) => {
                    const dateA = new Date(a.data);
                    const dateB = new Date(b.data);
                    return dateA.getTime() - dateB.getTime();
                }
            );

            setTransaction(transactions);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
        }
    };

    const handleNewTransaction = () => {
        const conta = getItem("conta");
        const usuario = conta ? JSON.parse(conta) : null;
        const token = usuario?.token;
        if (token) {
            fetchTransactions(token);
        }
    };

    const handleUpdateTransaction = () => {
        const conta = getItem("conta");
        const usuario = conta ? JSON.parse(conta) : null;
        const token = usuario?.token;
        if (token) {
            fetchTransactions(token);
        }
    };

    return (
        <div>
            <Header />
            <main className="home_main">
                <div className="descricao_container">
                    <div className="descricao">
                        <div className="tabela_container">
                            <FilterButton />
                            <Table
                                transaction={transaction}
                                setTransaction={setTransaction}
                                setCurrentRegister={setCurrentRegister}
                                setEditRegister={setEditRegister}
                            />
                        </div>
                        <div className="resumo_container">
                            <div className="resumo_container_main">
                                <Resumo transaction={transaction} />
                                <button
                                    className="default_btn"
                                    onClick={() => setAddRegister(true)}
                                >
                                    Adicionar Registro
                                </button>
                            </div>
                            <AddModalRegister
                                show={addRegister}
                                onClose={() => setAddRegister(false)}
                                onNewTransaction={handleNewTransaction}
                            />
                            {editRegister && (
                                <EditModalRegister
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