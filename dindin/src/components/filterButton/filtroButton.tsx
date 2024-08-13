import './filtroButton.css';
import Filter from "../../../assets/iconFiltro.svg";

export const FilterButton = () => {
    return (
        <div className='filter_btn'>
            <img src={Filter} alt="filtro" />
            <strong>Filtrar</strong>
        </div>
    )
}