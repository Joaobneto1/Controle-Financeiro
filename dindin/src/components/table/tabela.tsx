import iconEditar from "../../../assets/iconEditar.svg";
import iconLixo from "../../../assets/iconLixo.svg";
import iconTriangulo from "../../../assets/iconTriangulo.svg";
import "../../global.css";
import { getItem } from "../../api/axiosApi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Popup } from "../deletPopUp/confirmDelete";
import { EditModalRegister } from "../registerModal/registrarModaEdit";
import { ICategory, Transaction, TableProps } from "../../interfaces/interfaces";
import "./tabela.css";

export const Table = ({
    transaction, setTransaction, setEditRegister, setCurrentRegister }: TableProps) => {
    const token = getItem("token");
    const [registroAtualEdicao] = useState<Transaction | undefined>(undefined);
    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
    const [categorias, setCategorias] = useState<ICategory[]>([]);
    const [mostrarPopupExcluir, setMostrarPopupExcluir] = useState<number | null>(null);
    const [ordenacao, setOrdenacao] = useState("asc");

    function alterarOrdenacao() {
        const novaOrdenacao = ordenacao === "asc" ? "desc" : "asc";

        const transacoesOrdenadas = [...transaction].sort((a, b) => {
            const dataA = new Date(a.data);
            const dataB = new Date(b.data);
            return novaOrdenacao === "asc" ? dataA.getTime() - dataB.getTime() : dataB.getTime() - dataA.getTime();
        });

        setTransaction(transacoesOrdenadas);
        setOrdenacao(novaOrdenacao);
    }

    useEffect(() => {
        const buscarCategorias = async () => {
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

        buscarCategorias();
    }, [token]);

    const obterDescricaoCategoria = (categoriaId: number) => {
        const categoria = categorias.find((cat) => Number(cat.id) === categoriaId);
        return categoria ? categoria.descricao : "Desconhecida";
    };

    const formatarData = (data: string) => {
        const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
        });
        return dataFormatada;
    };

    const obterDiaSemana = (data: string) => {
        const diasSemana = [
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
            "Domingo",
        ];
        const dataObjeto = new Date(data);
        const dia = dataObjeto.getDay();
        return diasSemana[dia];
    };

    const excluirTransacao = async (id: number) => {
        try {
            await axios.delete(
                `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTransaction(transaction.filter((transacao) => transacao.id !== id));
        } catch (erro) {
            console.error("Erro ao excluir transação:", erro);
        }
    };

    const editarRegistro = (id: number) => {
        const registro = transaction.find((transacao) => transacao.id === id);
        if (registro) {
            setCurrentRegister(registro);
            setEditRegister(true);
        }
    };

    const buscarTransacoes = async () => {
        try {
            const resposta = await axios.get(
                "https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTransaction(resposta.data);
        } catch (erro) {
            console.error("Erro ao buscar transações:", erro);
        }
    };
    return (
        <div className="schedule_container">
            <table>
                <thead>
                    <tr className="schedule_header">
                        <th className="icon_triangulo" onClick={alterarOrdenacao}>
                            Data
                            <img
                                src={iconTriangulo}
                                alt="Ícone ordenar por data ascendente"
                                style={{ display: ordenacao === "asc" ? "inline" : "none" }}
                            />
                        </th>
                        <th className="schedule_itens">Dia da Semana</th>
                        <th className="schedule_itens">Descrição</th>
                        <th className="schedule_itens">Categoria</th>
                        <th className="schedule_itens">Valor</th>
                        <th className="schedule_itens"></th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map((transacao) => (
                        <tr key={transacao.id}>
                            <td className="schedule_itens_btn"
                            >
                                <p className="data_item">{formatarData(transacao.data)}</p>
                            </td>
                            <td className="schedule_itens_btn"
                            >
                                <p>{obterDiaSemana(transacao.data)}</p>
                            </td>
                            <td className="schedule_itens_btn"
                            > <p className="container_description">
                                    {transacao.descricao}
                                </p>
                            </td>
                            <td className="schedule_itens_btn"
                            >
                                <p>{obterDescricaoCategoria(transacao.categoria_id)}</p>
                            </td>
                            <td className="schedule_itens_btn"
                                style={{
                                    color:
                                        transacao.tipo === "saida" ? "#fa8c10;" : "#6460fb;",
                                }}
                            >
                                <p>R$ {transacao.valor}</p>
                            </td>
                            <td className="schedule_itens_btn" >
                                <img
                                    src={iconEditar}
                                    alt="Edit icon"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => editarRegistro(transacao.id)}
                                />
                                <img
                                    src={iconLixo}
                                    alt="Delete icon"
                                    style={{ marginLeft: "13px", cursor: "pointer" }}
                                    onClick={() => setMostrarPopupExcluir(transacao.id)}
                                />
                                {mostrarPopupExcluir === transacao.id && (
                                    <Popup
                                        onConfirm={() => {
                                            excluirTransacao(transacao.id);
                                            setMostrarPopupExcluir(null);
                                        }}
                                        onCancel={() => setMostrarPopupExcluir(null)}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {mostrarModalEdicao && registroAtualEdicao && (
                <EditModalRegister
                    show={mostrarModalEdicao}
                    onClose={() => setMostrarModalEdicao(false)}
                    onUpdate={() => {
                        setMostrarModalEdicao(false);
                        buscarTransacoes();
                    }}
                    currentRegister={registroAtualEdicao}
                />
            )}
        </div>
    );

}