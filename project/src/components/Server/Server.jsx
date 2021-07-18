import columns from './columns'
import rows from './rows'
import {ORDER_ASC} from '../DataGridContainer/constants';

export const getColumns = () => columns

export const getRows = ({filter, sortColumn, page}) => getPage(sortRows(getFilteredRows(rows, filter),sortColumn), page)

export const onAddNewOrder = (order) => rows.unshift({...order})

export const getRowCount = () => rows.length

const getPage = (rows, page) => {
    const pageSize = 10
    return rows.slice((page - 1) * pageSize, page * pageSize)
}

const getFilteredRows = (rows, filter) => {
    if (filter && filter.key && filter.value) {
        return rows.filter(it => it[filter.key] && it[filter.key].indexOf(filter.value) !== -1)
    } else {
        return rows
    }
}

const sortRows = (rows, sortColumn) => {
    if (sortColumn && sortColumn.key) {
        const direction = sortColumn.direction === ORDER_ASC ? 1 : -1
        return rows.sort((row1, row2) => {
            if (row1[sortColumn.key] === row2[sortColumn.key]) return 0
            else return (row1[sortColumn.key] > row2[sortColumn.key] ? 1 : -1) * direction
        })
    }
    return rows
}
