import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../global.css";
import "./registrarModalEdit.css"
import { NumberFormatValues } from "react-number-format";
import { NumericFormat } from "react-number-format";
import { getItem } from "../../api/axiosApi";
import { EditarCategoria, RegisterModalProps } from "../../interfaces/interfaces";

export const EditModalRegister: React.FC<RegisterModalProps> = ({
    show, onClose, onUpdate, currentRegister,
}) => {
    const [dadosFormulario, setDadosFormulario] = useState({
        valor: "",
        categoria: "",
        data: "",
        descricao: "",
        tipo: "entrada" as "entrada" | "saida",
    });
    const token = getItem("token");
    const [categorias, setCategorias] = useState<EditarCategoria[]>([]);

    useEffect(() => {
        if (currentRegister) {
            setDadosFormulario({
                valor: currentRegister.valor.toString(),
                categoria: currentRegister.categoria_id.toString(),
                data: currentRegister.data.split("T")[0],
                descricao: currentRegister.descricao,
                tipo: currentRegister.tipo,
            });
        }
    }, [currentRegister]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const resposta = await axios.get(
                    "https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCategorias(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar categorias:", erro);
            }
        };

        fetchCategories();
    }, [token]);

    const handleAlteracaoInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setDadosFormulario((prev) => ({ ...prev, [name]: value }));
    };

    const handleAlteracaoValorNumerico = (valores: NumberFormatValues) => {
        const { value } = valores;
        setDadosFormulario((prev) => ({ ...prev, valor: value }));
    };

    const handleCliqueTipo = (tipoSelecionado: "entrada" | "saida") => {
        setDadosFormulario((prev) => ({ ...prev, tipo: tipoSelecionado }));
    };

    const handleEnvio = async (e: React.FormEvent) => {
        e.preventDefault();

        const registroAtualizado = {
            valor: parseFloat(
                dadosFormulario.valor.replace(/[^0-9,.]/g, "").replace(",", ".")
            ),
            categoria_id: parseInt(dadosFormulario.categoria),
            data: dadosFormulario.data,
            descricao: dadosFormulario.descricao.trim() === "" ? "-" : dadosFormulario.descricao,
            tipo: dadosFormulario.tipo,
        };

        try {
            await axios.put(
                `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${currentRegister?.id}`,
                registroAtualizado,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Registro editado");
            if (typeof onUpdate === "function") {
                onUpdate();
            }
            onClose();
        } catch (erro) {
            console.error("Erro ao editar registro:", erro);
        }
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className="conteudo_modal">
                <div className="modal_container_titulo">
                    <h2 className="modal_titulo">Editar Registro</h2>
                    <span className="fechar" onClick={onClose}>
                        &times;
                    </span>
                </div>

                <div className="tipo_transacao">
                    <button
                        className="default_btn btn_modal_tipo"
                        style={{
                            backgroundColor:
                                dadosFormulario.tipo === "entrada" ? "#3a9ff1;" : "#555555;",
                        }}
                        onClick={() => handleCliqueTipo("entrada")}
                    >
                        Entrada
                    </button>
                    <button
                        className="default_btn btn_modal_tipo"
                        style={{
                            backgroundColor:
                                dadosFormulario.tipo === "saida" ? "#ff576b;" : "#555555;",
                        }}
                        onClick={() => handleCliqueTipo("saida")}
                    >
                        Saída
                    </button>
                </div>
                <form className="container_group" onSubmit={handleEnvio}>
                    <div className="formulario_group">
                        <label>Valor</label>
                        <NumericFormat
                            value={dadosFormulario.valor}
                            onValueChange={handleAlteracaoValorNumerico}
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
                    <div className="formulario_group">
                        <label>Categoria</label>
                        <select
                            className="categoria_sct"
                            name="categoria"
                            value={dadosFormulario.categoria}
                            onChange={handleAlteracaoInput}
                        >
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.descricao}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="formulario_group">
                        <label>Data</label>
                        <input
                            type="date"
                            name="data"
                            value={dadosFormulario.data}
                            onChange={handleAlteracaoInput}
                        />
                    </div>
                    <div className="formulario_group">
                        <label>Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            value={dadosFormulario.descricao}
                            onChange={handleAlteracaoInput}
                        />
                    </div>
                    <button className="default_btn modal_btn" type="submit">
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
};