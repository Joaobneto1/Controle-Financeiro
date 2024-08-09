import "../../global.css";
import "./tabela.css";
import iconEdit from "../../../assets/iconEditar.svg"
import iconDelete from "../../../assets/iconLixo.svg"
import iconTriangle from "../../../assets/iconTriangulo.svg"
import { useEffect, useState } from "react";
import { PropsTabela, TableCategoria } from "../../interfaces/interfaces";
import axios from "axios";
import { getItem } from "../../api/axiosApi";
import { ConfirmDelete } from "../deletPopUp/confirmDelete";

export const Tabela = ({
    transacao,
    setTransacao,
    setEditRegister,
    setCurrentRegister,
}: PropsTabela) => {
    const token = getItem("token");
    const [categorias, setCategorias] = useState<TableCategoria[]>([]);
    const [showDeletePopup, setShowDeletePopup] = useState<number | null>(null);
    const [isAscending, setIsAscending] = useState(true);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const { data } = await axios.get(
                    "https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCategorias(data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };
        fetchCategorias();
    }, [token]);

    const getCategoriaDescricao = (categoriaId: number) => {
        const categoria = categorias.find(categor => Number(categor.id) === categoriaId);
        return categoria ? categoria.descricao : "Desconhecida";
    }

    const handleDate = (data: string, options?: Intl.DateTimeFormatOptions) =>
        new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC", ...options });

    const handleDeleteItem = async (id: number) => {
        try {
            await axios.delete(
                `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTransacao(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error("Erro ao excluir transação:", error);
        }
    };

    const handleEditRegister = (id: number) => {
        const registro = transacao.find(t => t.id === id);
        if (registro) {
            setCurrentRegister(registro);
            setEditRegister(true);
        }
    };

    const handleSort = () => {
        const sortedTransacao = [...transacao].sort((a, b) =>
            isAscending
                ? new Date(a.data).getTime() - new Date(b.data).getTime()
                : new Date(b.data).getTime() - new Date(a.data).getTime()
        );
        setIsAscending(!isAscending);
        setTransacao(sortedTransacao);
    };
    return (
        <div className="tabela_container">
            <table className="tabela_transacao">
                <thead className="titulo_container">
                    <tr className="titulo_container_text">
                        <th onClick={handleSort}>
                            Data
                            <img
                                src={iconTriangle}
                                alt="ícone para organizar a data"
                                className={isAscending ? "organizar_cima" : "organizar_baixo"}
                            />
                        </th>
                        <th>Dia da Semana</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="lista_container">
                    {transacao.map(({ id, data, descricao, categoria_id, valor, tipo }) => (
                        <tr key={id} className="lista_itens">
                            <td><p>{handleDate(data)}</p></td>
                            <td><p>{handleDate(data, { weekday: "long" })}</p></td>
                            <td className="tabela_descricao"><p>{descricao}</p></td>
                            <td className="tabela_categoria"><p>{getCategoriaDescricao(categoria_id)}</p></td>
                            <td className="valor_coluna" style={{ color: tipo === "saida" ? "#FA8C10" : "#7B61FF" }}>
                                <p>R$ {valor}</p>
                            </td>
                            <td className="icone_editar">
                                <p>
                                    <img
                                        src={iconEdit}
                                        alt="ícone de editar"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleEditRegister(id)}
                                    />
                                    <img
                                        src={iconDelete}
                                        alt="ícone de deletar"
                                        style={{ marginLeft: "13px", cursor: "pointer" }}
                                        onClick={() => setShowDeletePopup(id)}
                                    />
                                    {showDeletePopup === id && (
                                        <ConfirmDelete
                                            bConfirm={() => {
                                                handleDeleteItem(id);
                                                setShowDeletePopup(null);
                                            }}
                                            bCancel={() => setShowDeletePopup(null)}
                                        />
                                    )}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
