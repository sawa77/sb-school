import React from 'react';
import './OrderCard.css';
import {COLUMN_KEY_FIO, COLUMN_KEY_DATA} from '../../constants'

const OrderCard = ( {row: rowProcessed, onSave, onCancel}) => {
    const row = {...rowProcessed}

    const onChangeFieldValue = (field, value) => row[field] = value
    
    const OrderCardField = ({name, description}) => {
        return <div className='ordercard-field'>
                <input type='text' placeholder={description} value={row[name]} onChange={(event) => onChangeFieldValue(name, event.target.value)} />
            </div>
    }

    return <div className='ordercard-container'>
        <OrderCardField description='Введите ФИО' name={COLUMN_KEY_FIO}/>
        <OrderCardField description='Введите данные' name={COLUMN_KEY_DATA}/>
        <input type='button' value='Сохранить' onClick={() => onSave(row)}/>
        <input type='button' value='Отмена' onClick={() => onCancel()}/>
    </div>
};

export default OrderCard;