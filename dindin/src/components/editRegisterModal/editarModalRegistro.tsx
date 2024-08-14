import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { EditarRegistrarModalProps, EditarCategoria } from "../../interfaces/interfaces";
import { getToken } from "../../utils/Auth";
import "../editRegisterModal/editarModalRegistro.css";
import "./editarModalRegistro.css";

export const EditarRegistroModal: React.FC<EditarRegistrarModalProps> = ({
    show,
    onClose,
    onUpdate,
    currentRegister,
}) => {
    const [formData, setFormData] = useState({
        valor: currentRegister?.valor.toString() || "",
        categoria: currentRegister?.categoria_id.toString() || "",
        data: currentRegister?.data.split("T")[0] || "",
        descricao: currentRegister?.descricao || "",
        tipo: currentRegister?.tipo || "entrada",
    });

    const [categorias, setCategorias] = useState<EditarCategoria[]>([]);

    useEffect(() => {
        const token = getToken();
        if (token) {
            axios.get("https://desafio-backend-03-dindin.pedagogico.cubos.academy/categoria", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setCategorias(response.data))
            .catch((error) => console.error("Erro ao buscar categorias:", error));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getToken();
        const updatedRegister = {
            valor: parseFloat(formData.valor.replace(/[^0-9,.]/g, "").replace(",", ".")),
            categoria_id: parseInt(formData.categoria),
            data: formData.data,
            descricao: formData.descricao,
            tipo: formData.tipo,
        };

        if (token) {
            try {
                await axios.put(
                    `https://desafio-backend-03-dindin.pedagogico.cubos.academy/transacao/${currentRegister?.id}`,
                    updatedRegister,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("Registro editado");
                onUpdate?.();
                onClose();
            } catch (error) {
                console.error("Erro ao editar registro:", error);
            }
        }
    };

    const handleTipoClick = (tipo: "entrada" | "saida") => {
        setFormData((prev) => ({ ...prev, tipo }));
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal_conteudo">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Editar Registro</h2>
                <div className="tipo_transacao">
                    {["entrada", "saida"].map((tipo) => (
                        <button
                            key={tipo}
                            style={{
                                backgroundColor: formData.tipo === tipo ? (tipo === "entrada" ? "#3A9FF1" : "#FF576B") : "#808080",
                            }}
                            onClick={() => handleTipoClick(tipo as "entrada" | "saida")}
                        >
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </button>
                    ))}
                </div>
                <form className="formulario_editar_transacao" onSubmit={handleSubmit}>
                    <div className="formulario_g">
                        <label>Valor</label>
                        <NumericFormat
                            value={formData.valor}
                            onValueChange={({ value }) => setFormData((prev) => ({ ...prev, valor: value }))}
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
                            value={formData.categoria}
                            onChange={(e) => setFormData((prev) => ({ ...prev, categoria: e.target.value }))}
                        >
                            {categorias.map(({ id, descricao }) => (
                                <option key={id} value={id}>
                                    {descricao}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="formulario_g">
                        <label>Data</label>
                        <input
                            type="date"
                            value={formData.data}
                            onChange={(e) => setFormData((prev) => ({ ...prev, data: e.target.value }))}
                        />
                    </div>
                    <div className="formulario_g">
                        <label>Descrição</label>
                        <input
                            type="text"
                            value={formData.descricao}
                            onChange={(e) => setFormData((prev) => ({ ...prev, descricao: e.target.value }))}
                        />
                    </div>
                    <button type="submit">Confirmar</button>
                </form>
            </div>
        </div>
    );
};