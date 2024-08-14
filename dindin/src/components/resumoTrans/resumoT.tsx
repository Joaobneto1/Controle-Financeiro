import "../../global.css";
import { ResumeTableProps } from "../../interfaces/interfaces";
import "./resumoT.css";
<<<<<<< HEAD
import { Transacao, ResumeTProps } from "../../interfaces/interfaces";
=======
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513
import { useState, useEffect } from "react";
import { getToken } from "../../utils/Auth";

<<<<<<< HEAD
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
=======
export const Resumo = ({ transaction }: ResumeTableProps) => {
    const [totalEntrada, setTotalEntrada] = useState<number>(0);
    const [totalSaida, setTotalSaida] = useState<number>(0);

    useEffect(() => {
        let somaEntrada = 0;
        let somaSaida = 0;
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513

        transaction.forEach((item) => {
            if (item.tipo === "entrada") {
                somaEntrada += Number(item.valor);
            } else if (item.tipo === "saida") {
                somaSaida += Number(item.valor);
            }
        });
        setTotalEntrada(Number(somaEntrada.toFixed(2)));
        setTotalSaida(Number(somaSaida.toFixed(2)));
    }, [transaction]);

    const saldo = totalEntrada - totalSaida;

    return (
        <><div className="resumo_container">
            <h2>Resumo</h2>
            <div className="item">
                <span className="item_rotulo">Entrada</span>
                <span className="entrada_valor">R$ {totalEntrada.toFixed(2)}</span>
            </div>
            <div className="item">
                <span className="item_rotulo">Saída</span>
                <span className="saida_valor">R$ {totalSaida.toFixed(2)}</span>
            </div>
            <hr />
<<<<<<< HEAD
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
=======
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
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513
};