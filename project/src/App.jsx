import React from 'react'
import { connect } from 'react-redux'
import cc from "classcat"
import themes from './App.css'
import DataGridContainer from './components/DataGridContainer/DataGridContainer'
import OrderCard from './components/OrderCard/OrderCard'
import Dialog from './components/Dialog/Dialog'
import {columnSortChanged, filterChanged, pageChanged, getColumns, getRows, onAddNewOrder} from "./actions/actions"
import {THEME_DEFAULT, FILTER_COLUMN_KEY, pageSize} from './constants'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentTheme: THEME_DEFAULT,
            orderCardOpened: false,
            selectedRow: {},
            editingRow: {}
        }
        this.onChangeSortColumn = this.onChangeSortColumn.bind(this)
        this.onChangeFilter = this.onChangeFilter.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.initData()
    }

    initData() {
        this.props.getColumns()
        this.props.getRows()
    }

    onChangeFilter(event) {
        this.props.filterChanged({key: FILTER_COLUMN_KEY, value: event.target.value})
    }

    onChangeSortColumn(sortColumn) {
        this.props.columnSortChanged(sortColumn)
    }

    onChangePage(page) {
        this.props.pageChanged(page)
    }

    onEdit(order = {isNew: true}) {
        this.setState({editingRow: order, orderCardOpened: true})
    }

    onSave(row) {
        if (row.isNew) {
            this.props.onAddNewOrder(row)
        } else {
            this.props.onChangeOrder(row)
        }  
        this.setState({orderCardOpened: false})      
    }

    onCancel() {
        this.setState({orderCardOpened: false})
    }

    render() {
        const { orderCardOpened, editingRow, selectedRow, currentTheme } = this.state
        const { columns, rows, page, rowCount, defaultSortColumn } = this.props
        return (
            <div className={cc({
                    [themes[currentTheme]]: true}
                )}>
                <div className='header'>
                    <div className='title'>Список заказов</div>
                    <div className='theme-panel'>
                </div>
                </div>
                <div className='filter-panel'>
                    <div className='filter-panel__block'>
                        <input type='text' placeholder={'Введите ФИО'} onChange={this.onChangeFilter} />
                    </div>
                </div>
                <DataGridContainer 
                    columns={columns} 
                    rows={rows} 
                    page={page} 
                    pageSize={pageSize} 
                    rowCount={rowCount}
                    selectedRow={selectedRow}
                    onChangeSelected={(selectedRow) => this.setState({selectedRow})}
                    defaultSortColumn={defaultSortColumn}
                    onChangeSortColumn={this.onChangeSortColumn} 
                    onChangePage={this.onChangePage}
                />
                <input type='button' value='Добавить...' onClick={() => this.onEdit()}/>
                <input type='button' value='Изменить...' onClick={() => this.onEdit(selectedRow)}/>
                {
                    orderCardOpened && <Dialog>
                        <OrderCard row={editingRow} onSave={this.onSave} onCancel={this.onCancel}/>
                    </Dialog>
                }
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    columns: state.reducer.columns,
    rows: state.reducer.rows,
    page: state.reducer.page,
    rowCount: state.reducer.rowCount,
    defaultSortColumn: state.reducer.sortColumn,
})

const mapDispatchToProps = dispatch => ({
    getColumns: () => dispatch(getColumns()),
    getRows: () => dispatch(getRows()),
    pageChanged: (page) => dispatch(pageChanged(page)),
    filterChanged: (filter) => dispatch(filterChanged(filter)),
    columnSortChanged: (sortColumn) => dispatch(columnSortChanged(sortColumn)),
    onAddNewOrder: (order) => dispatch(onAddNewOrder(order))
  })
export default connect(mapStateToProps, mapDispatchToProps)(App)