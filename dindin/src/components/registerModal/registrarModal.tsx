import React, { useEffect, useState } from "react";
import axios from "axios";
import "./registrarModal.css";
import "../../global.css"
import { getItem } from "../../api/axiosApi";
import { TableCategoria, RegistrarModalProps } from "../../interfaces/interfaces";
import { NumericFormat } from "react-number-format";


export const RegistrarModal: React.FC<RegistrarModalProps> = ({
    show,
    onClose,
    onNewTransaction,
}) => {
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState<TableCategoria[]>([]);
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    const token = getItem("token");

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(
                    "https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCategoria(response.data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        fetchCategorias();
    }, [token]);

    useEffect(() => {
        if (categoria.length > 0) {
            setCategoriaSelecionada(categoria[0].descricao);
        }
    }, [categoria]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const idCategoria = categoria.find(
            (option) => option.descricao === categoriaSelecionada
        )?.id;
        const newResgister = { tipo, valor: Number(valor), categoria_id: idCategoria, data, descricao };

        try {
            const response = await axios.post(
                "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao", newResgister, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );

            if (response.status === 201) {
                setTipo("entrada")
                setCategoriaSelecionada(categoria[0].descricao);
                setData("");
                setValor("");
                setDescricao("");
                onNewTransaction();
            }
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar registro:", error);
        }
    };

    const handleTipoClick = (tipo: "entrada" | "saida") => {
        setTipo(tipo);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal_conteudo">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Adicionar Registro</h2>
                <div className="tipo_transacao">
                    <button
                        style={{
                            backgroundColor: tipo === "entrada" ? "#3A9FF1" : "#808080",
                        }}
                        onClick={() => handleTipoClick("entrada")}
                    >
                        Entrada
                    </button>
                    <button
                        style={{
                            backgroundColor: tipo === "saida" ? "#FF576B" : "#808080",
                        }}
                        onClick={() => handleTipoClick("saida")}
                    >
                        Saída
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="formulario_g">
                        <label>Valor</label>
                        <NumericFormat
                            value={valor}
                            onValueChange={(values) => {
                                const { value } = values;
                                setValor(value);
                            }}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="R$ "
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            className="input"
                            required
                        />
                    </div>
                    <div className="formulario_g">
                        <label>Categoria</label>
                        <select
                            value={categoriaSelecionada}
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        >
                            {categoria.map((option) => (
                                <option key={option.id} value={option.descricao}>
                                    {option.descricao}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="formulario_g">
                        <label>Data</label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div className="formulario_g">
                        <label>Descrição</label>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>
                    <button className="confirmar_btn" type="submit">
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
};