import React from 'react';
import './PagginationGrid.css';

const PagginationGrid = ( { pageSize, rowCount, page, onChangePage }) => {
        
    const calcPageCount = (pageSize, rowCount) => {
        let result = Math.trunc(rowCount / pageSize)
        if (result % 10 > 0) result++
        return result
    }

    const pageCount = calcPageCount(pageSize, rowCount)
    const leftArrowDisabled = Boolean(page <= 1)
    const rightArrowDisabled = Boolean(page >= pageCount)
    const COUNT_EMPTY = 2 + 1 // 2 пыстые кнопки '...'

    return <div className='paggiation-grid'>
        <div
            className='paggiation-grid-button' 
            disabled={leftArrowDisabled}
            onClick={() => !leftArrowDisabled && onChangePage && onChangePage(page - 1)}>{'<<'}</div>
         {
           new Array(pageCount || 0).fill(0).map((it, i) => {
                i += 1
                if (
                    i === 1 || // всегда показываем первую
                    i === pageCount || // и последнюю
                    ( // заполняем набор кнопкок панели 
                    i >= (page < (pageCount - 1) ? page  : pageCount - ( COUNT_EMPTY) + 1) &&
                    i <= (page < COUNT_EMPTY ? COUNT_EMPTY : page))
                ) {
                    return <div className='paggiation-grid-button' key={i} onClick={() => onChangePage && onChangePage(i)}>
                        {i}
                    </div>
                } else if (i === 2 || i === pageCount - 1) {
                    return <div>...</div>
                }
            })
        }
        <div
            className='paggiation-grid-button' 
            disabled={rightArrowDisabled}
            onClick={() => !rightArrowDisabled && onChangePage && onChangePage(page + 1)}>{'>>'}</div>
    </div>
};

export default PagginationGrid;