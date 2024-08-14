export interface Transaction {
    id: number;
    data: string;
    descricao: string;
    categoria_id: number;
    valor: number;
    tipo: "entrada" | "saida";
}

export interface ICategory {
    id: string;
    descricao: string;
}

export interface EditarCategoria {
    id: number;
    descricao: string;
}

export interface AddRegisterModalProp {
    show: boolean;
    onClose: () => void;
    onNewTransaction: () => void;
}

export interface RegisterModalProps {
    show: boolean;
    onClose: () => void;
    onUpdate: () => void;
    currentRegister: Transaction | undefined;
}

export interface PopupProp {
    onConfirm: () => void;
    onCancel: () => void;
}

export interface TableProps {
    transaction: Transaction[];
    setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;
    setEditRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentRegister: React.Dispatch<
        React.SetStateAction<Transaction | undefined>
    >;
}

export interface ResumeTableProps {
    transaction: Transaction[];
}

export interface AppRoutesProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

export type LoginError = {
    message: string;
};

export interface LoginProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface HeaderProps {
    isLoggedIn: boolean;
}