import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CHZBankReducer from './render/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';

const store = createStore(CHZBankReducer);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, 
  document.getElementById('root'));

serviceWorker.unregister();
