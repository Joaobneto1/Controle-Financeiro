import axios from "axios";
import "./resumoT.css";
import { getItem } from "../../api/axiosApi";
import { Transacao, ResumeTProps } from "../../interfaces/interfaces";
import { useState, useEffect } from "react";

export const ResumoT = ({ transacao }: ResumeTProps) => {
    const [entrada, setIncome] = useState<number>(0);
    const [saida, setExpense] = useState<number>(0);
    const saldo = entrada - saida;

    const authToken = getItem("token");

    useEffect(() => {
        const fetchSummary = async () => {
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
        };
        fetchSummary();
    }, [authToken]);

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
        <div className="resumo">
            <div className="resumo_container">
                <h2>Resumo</h2>
            </div>
            <table className="resumo_tabela">
                <tbody className="tbody">
                    <tr>
                        <th scope="row" className="entrada_texto">
                            Entradas
                        </th>
                        <td className="entradas">R$ {entrada.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="saida_texto">
                            Saídas
                        </th>
                        <td className="saidas">R$ {saida.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table className="resumo_tabela">
                <tbody>
                    <tr>
                        <th scope="row" className="saldo_texto">
                            Saldo
                        </th>
                        <td className="saldo">R$ {saldo.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
