import React from 'react';
import './HeaderGrid.css';
import {ORDER_DESC, ORDER_ASC} from '../constants';

const HeaderGrid = ( props ) => {

    const {columns, defaultSortColumn} = props
    const [sortColumn, setSortColumn] = React.useState(defaultSortColumn || {});

    const onChangeSortColumn = (column) => {
        let sortColumnNew = {...sortColumn};
        if (sortColumnNew.key === column.key) {
            // при наличии сортировки укажем обратный текущему порядок
            sortColumnNew.direction = sortColumn.direction === ORDER_ASC ? ORDER_DESC : ORDER_ASC;
        } else {
            // при отсутствии сортировки укажем по возрастанию
            sortColumnNew = {key: column.key, direction: ORDER_ASC}
        }
        setSortColumn(sortColumnNew);
        props.onChangeSortColumn(sortColumnNew)
    }

    return <div className='header-grid'>
        {columns.map( (column, index) => 
            <div className='grid-cell__header' key={index} onClick={() => onChangeSortColumn(column)}>
                {column.title}
            </div>
        )}
    </div>
};

export default HeaderGrid;