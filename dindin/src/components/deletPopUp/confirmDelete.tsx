import React from "react";
import { PopupProp } from "../../interfaces/interfaces";
import "./confirmDelete.css";

export const Popup: React.FC<PopupProp> = ({ onConfirm, onCancel }) => {
    return (
        <div className="popup_confirm">
            <p>Apagar Item?</p>
            <div className="popup_btns">
                <button className="popup_btnYes" onClick={onConfirm}>
                    Sim
                </button>
                <button className="popup_btnNo" onClick={onCancel}>
                    Não
                </button>
            </div>
        </div>
    );
};