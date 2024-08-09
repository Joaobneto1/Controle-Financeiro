import React from "react";
import "./confirmDelete.css";
import { ConfirmDeletePoP } from "../../interfaces/interfaces";

export const ConfirmDelete: React.FC<ConfirmDeletePoP> = ({ bConfirm, bCancel }) => {
    return (
        <div className="confirm_delet">
            <p>Apagar Item?</p>
            <div className="buttons">
                <button className="button_yes" onClick={bConfirm}>Sim</button>
                <button className="button_no" onClick={bCancel}>Não</button>
            </div>
        </div>
    );
};