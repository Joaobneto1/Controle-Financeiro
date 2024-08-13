import "../../global.css";
import { ResumeTableProps } from "../../interfaces/interfaces";
import "./resumoT.css";
import { useState, useEffect } from "react";

export const Resumo = ({ transaction }: ResumeTableProps) => {
    const [totalEntrada, setTotalEntrada] = useState<number>(0);
    const [totalSaida, setTotalSaida] = useState<number>(0);

    useEffect(() => {
        let somaEntrada = 0;
        let somaSaida = 0;

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