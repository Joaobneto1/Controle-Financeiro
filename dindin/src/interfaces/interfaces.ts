export interface Transacao {
    id: number;
    data: string;
    descricao: string;
    categoria_id: number;
    valor: number;
    tipo: 'entrada' | 'saida';
}

export interface TableCategoria {
    id: string;
    descricao: string;
}

export interface PropsTabela {
    transacao: Transacao[];
    setTransacao: React.Dispatch<React.SetStateAction<Transacao[]>>;
    setEditRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentRegister: React.Dispatch<React.SetStateAction<Transacao | undefined>>;
}

export interface RegistrarModalProps {
    show: boolean;
    onClose: () => void;
    onNewTransaction: () => void;
}


export interface ConfirmDeletePoP {
    bConfirm: () => void;
    bCancel: () => void;
}

export interface EditarRegistrarModalProps {
    show: boolean;
    onClose: () => void;
    onUpdate: () => void;
    currentRegister: Transacao | undefined;
}

export interface EditarCategoria {
    id: number;
    descricao: string;
}

export interface HeaderProps {
    loggedIn: boolean;
}