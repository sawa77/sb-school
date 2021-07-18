import {SORT_CHANGED, GET_COLUMNS, FILTER_CHANGED, GET_ROWS, PAGE_CHANGED, ADD_ROW} from '../actions/actions'
import {getColumns, getRows, getRowCount, onAddNewOrder} from '../components/Server/Server'
import {FILTER_COLUMN_KEY} from '../constants'
import {ORDER_ASC} from '../components/DataGridContainer/constants'


const initialState = {
    rows:[],
    columns:[],
    sortColumn:{key:FILTER_COLUMN_KEY, direction:ORDER_ASC},
    filter:{},
    page: 1,
    rowCount: getRowCount()
}
  
export const reducer = (state = initialState, action) => {  
    switch (action.type) {
      case (SORT_CHANGED): {
        return {...state, sortColum: action.sortColum, rows: getRows({
            filter: state.filter, 
            sortColumn: action.sortColumn, 
            page: state.page
        })}
      }  
      case (GET_COLUMNS): {
        return {...state, columns: getColumns()}
      }  
      case (FILTER_CHANGED): {
        return {...state, filter: action.filter, rows: getRows({
            filter: action.filter, 
            sortColumn: state.sortColumn, 
            page: state.page
        })}
      }  
      case (PAGE_CHANGED): {
        return {...state, page: action.page, rows: getRows({
            filter: state.filter, 
            sortColumn: state.sortColumn, 
            page: action.page
        })}
      }   
      case (GET_ROWS): {
        const {page, filter, sortColumn} = state
        return {...state, rows: getRows({
            filter,
            sortColumn,
            page
        })}
      } 
      case (ADD_ROW): {
        onAddNewOrder(action.newRow)
        const {page, filter, sortColumn} = state
        const rows = getRows({
            filter,
            sortColumn,
            page
        })
        return {...state, rows}
      }
      
      default: return state
    }
}
  