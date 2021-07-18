import React from 'react';
import './DataGrid.css';
import cc from "classcat"

const DataGrid = ( {columns, rows, selectedRow, onChangeSelected }) => {
    return <div className='data-grid'>
            {columns.map( (column) =>  
                <div>
                    {rows.map( (row, index) =>             
                        <div className={
                        cc({
                            dataGridRow: true,
                            selected: selectedRow === row 
                        })
                    } key={index} onClick={() => onChangeSelected(row)}>
                        {row[column.key]}
                    </div>
                    )
                    }
                </div>
            )}
    </div>
};

export default DataGrid;