import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';

import App from './App';
import ErrorBoundary from './ErrorBoundary.component';
import './styles.css';

export const storeConfig = configureStore();

const rootElement = document.getElementById('root');

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={storeConfig.store}>
      <PersistGate loading={null} persistor={storeConfig.persistor}>	 
        <App />
      </PersistGate>
    </Provider>
  </ErrorBoundary>, 
  rootElement
);
