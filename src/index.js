import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { App } from './App';
import store from './state/store';

const rootElement = document.getElementById('root');

// eslint-disable-next-line no-console

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
