import React from 'react';
import './DataGridContainer.css';
import HeaderGrid from './HeaderGrid/HeaderGrid';
import DataGrid from './DataGrid/DataGrid';
import PagginationGrid from './PagginationGrid/PagginationGrid';

const DataGridContainer = props => {
    return <div className='grid-container'>
            <HeaderGrid {...props}/>
            <DataGrid {...props}/>
            <PagginationGrid {...props}/>
    </div>
};

export default DataGridContainer;