import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

import App from './App';
import ErrorBoundary from './ErrorBoundary.component';
import './styles.css';

const store = configureStore();

const rootElement = document.getElementById('root');

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>, 
  rootElement
);
