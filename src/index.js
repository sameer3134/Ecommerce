import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './context/Context';
import store from './components/redux/store/configureStore';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <Context>
      <App />
    </Context>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

