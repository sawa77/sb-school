import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './redux/reducer'

const store = createStore(combineReducers({reducer}), {})

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
)