import './filtroButton.css';
import Filter from "../../../assets/iconFiltro.svg";
import { FilterBProps } from '../../interfaces/interfaces';

export const FilterButton: React.FC<FilterBProps> = ({ filterB }) => {
    return (
        <div className='filter-button' onClick={filterB}>
            <img src={Filter} alt="filtro" />
            <strong>Filtrar</strong>
        </div>
    )
}