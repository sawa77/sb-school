export const SORT_CHANGED = 'SORT_CHANGED'
export const PAGE_CHANGED = 'PAGE_CHANGED'
export const FILTER_CHANGED = 'FILTER_CHANGED'
export const GET_COLUMNS = 'GET_COLUMNS'
export const GET_ROWS = 'GET_ROWS'
export const ADD_ROW = 'ADD_ROW'

export const columnSortChanged = (sortColumn) => {
    return {
        type:SORT_CHANGED,
        sortColumn
    }
};

export const filterChanged = (filter) => {
    return {
        type:FILTER_CHANGED,
        filter
    }
};

export const pageChanged = (page) => {
    return {
        type:PAGE_CHANGED,
        page
    }
};

export const getColumns = () => {
    return {
        type:GET_COLUMNS
    }
};

export const getRows = () => {
    return {
        type:GET_ROWS
    }
};

export const onAddNewOrder = (newRow) => {
    return {
        type:ADD_ROW,
        newRow
    }
};
