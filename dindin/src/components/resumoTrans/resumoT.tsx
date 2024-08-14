import axios from "axios";
import "./resumoT.css";
import { Transacao, ResumeTProps } from "../../interfaces/interfaces";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/Auth";

export const ResumoT = ({ transacao }: ResumeTProps) => {
    const [entrada, setIncome] = useState<number>(0);
    const [saida, setExpense] = useState<number>(0);
    const saldo = entrada - saida;

    useEffect(() => {
        const authToken = getToken();
        const fetchSummary = async () => {
            if (authToken) {
                try {
                    const response = await axios.get(
                        "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/extrato",
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        }
                    );
                    setIncome(response.data.entrada);
                    setExpense(response.data.saida);
                    console.log(response);
                } catch (error) {
                    console.error("Erro ao buscar resumo:", error);
                }
            }
        };
        fetchSummary();
    }, [transacao]);

    useEffect(() => {
        let totalIncome = 0;
        let totalExpense = 0;

        transacao.forEach((transacao: Transacao) => {
            if (transacao.tipo === 'entrada') {
                totalIncome += Number(transacao.valor);
            } else if (transacao.tipo === 'saida') {
                totalExpense += Number(transacao.valor);
            }
        });

        setIncome(Number(totalIncome.toFixed(2)));
        setExpense(Number(totalExpense.toFixed(2)));
    }, [transacao]);

    return (
        <><div className="resumo_container">
            <h2>Resumo</h2>
            <div className="item">
                <span className="item_rotulo">Entrada</span>
                <span className="entrada_valor">R$ {entrada.toFixed(2)}</span>
            </div>
            <div className="item">
                <span className="item_rotulo">Saída</span>
                <span className="saida_valor">R$ {saida.toFixed(2)}</span>
            </div>
            <div className="item">
                <span className="item_rotulo">Saldo</span>
                <span
                    className="saldo_valor"
                    style={{
                        color:
                            saldo < 0 ? "#fa8c10" : "#3a9ff1",
                    }}> R$ {saldo.toFixed(2)}
                </span>
            </div>
        </div></>);
};