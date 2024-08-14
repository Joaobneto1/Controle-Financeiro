<<<<<<< HEAD:dindin/src/components/registerModal/registrarModal.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./registrarModal.css";
import "../../global.css"
import { TableCategoria, RegistrarModalProps } from "../../interfaces/interfaces";
import { NumericFormat } from "react-number-format";
import { getToken } from "../../utils/Auth";

export const RegistrarModal: React.FC<RegistrarModalProps> = ({
    show,
    onClose,
    onNewTransaction,
=======
import React from "react";
import { useEffect, useState } from "react";
import api from "../../api/axiosApi";
import { NumericFormat } from "react-number-format";
import "../../global.css";
import "./addModalRegistro.css";
import { getItem } from "../../api/axiosApi";
import { ICategory, AddRegisterModalProp } from "../../interfaces/interfaces";

export const AddModalRegister: React.FC<AddRegisterModalProp> = ({
    show, onClose, onNewTransaction,
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513:dindin/src/components/addRegisterModal/addModalRegistro.tsx
}) => {
    const [valor, setValor] = useState("");
    const [categorias, setCategorias] = useState<ICategory[]>([]);
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    useEffect(() => {
<<<<<<< HEAD:dindin/src/components/registerModal/registrarModal.tsx
        const token = getToken();
        const fetchCategorias = async () => {
            if (token) {
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
            }
        };

        fetchCategorias();
    }, []);
=======
        const fetchCategories = async () => {
            try {
                const resposta = await api.get("https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria");
                setCategorias(resposta.data);
                if (resposta.data.length > 0) {
                    setCategoriaSelecionada(resposta.data[0].descricao);
                }
            } catch (erro) {
                console.error("Erro ao buscar categorias:", erro);
            }
        };

        fetchCategories();
    }, [token]);
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513:dindin/src/components/addRegisterModal/addModalRegistro.tsx

    useEffect(() => {
        setTipo("entrada");
    }, [show]);

    const handleEnvio = async (e: React.FormEvent) => {
        e.preventDefault();
<<<<<<< HEAD:dindin/src/components/registerModal/registrarModal.tsx
        const token = getToken();
        const idCategoria = categoria.find((option) => option.descricao === categoriaSelecionada)?.id;
        const newResgister = { tipo, valor: Number(valor), categoria_id: idCategoria, data, descricao };

        if (token) {
            try {
                const response = await axios.post(
                    "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao", newResgister, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );

                if (response.status === 201) {
                    setTipo("entrada");
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
=======
        const categoriaId = categorias.find(
            (opcao) => opcao.descricao === categoriaSelecionada
        )?.id;
        const novoRegistro = {
            tipo,
            valor: Number(valor),
            categoria_id: categoriaId,
            data,
            descricao: descricao.trim() === "" ? "-" : descricao,
        };

        try {
            const resposta = await api.post(
                "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao", novoRegistro);
            if (resposta.status === 201) {
                setTipo("entrada");
                setCategoriaSelecionada(categorias[0].descricao);
                setData("");
                setValor("");
                setDescricao("");
                onNewTransaction();
            }
            onClose();
        } catch (erro) {
            console.error("Erro ao adicionar registro:", erro);
>>>>>>> 697ea9788f706c47133693df2e45945d72fac513:dindin/src/components/addRegisterModal/addModalRegistro.tsx
        }
    };

    const handleCliqueTipo = (novoTipo: "entrada" | "saida") => {
        setTipo(novoTipo);
    };

    if (!show) {
        return null;
    }
    return (
        <div className="modal">
            <div className="conteudo_modal">
                <div className="modal_container_titulo">
                    <h2 className="modal_titulo">Adicionar Registro</h2>
                    <span className="fechar" onClick={onClose}>
                        &times;
                    </span>
                </div>

                <div className="tipo_transacao">
                    <button
                        className="default_btn btn_modal_tipo"
                        style={{
                            backgroundColor:
                                tipo === "entrada"
                                    ? "#3a9ff1;"
                                    : "#555555;",
                        }}
                        onClick={() => handleCliqueTipo("entrada")}
                    >
                        Entrada
                    </button>
                    <button
                        className="default_btn btn_modal_tipo"
                        style={{
                            backgroundColor:
                                tipo === "saida" ? "#ff576b;" : "#555555;",
                        }}
                        onClick={() => handleCliqueTipo("saida")}
                    >
                        Saída
                    </button>
                </div>
                <form className="container_group" onSubmit={handleEnvio}>
                    <div className={"formulario_group"}>
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
                    <div className={"formulario_group"}>
                        <label>Categoria</label>
                        <select
                            className="categoria_sct"
                            value={categoriaSelecionada}
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        >
                            {categorias.map((option) => (
                                <option key={option.id} value={option.descricao}>
                                    {option.descricao}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={"formulario_group"}>
                        <label>Data</label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div className={"formulario_group"}>
                        <label>Descrição</label>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
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