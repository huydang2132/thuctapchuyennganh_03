import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './containers/App';
import './styles/styles.scss';

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <App persistor={persistor} />
    </Provider>,
    document.getElementById('root')
  );
};

renderApp();