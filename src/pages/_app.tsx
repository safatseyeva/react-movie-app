import React from 'react';
import { getStore, makeStore } from '../store';

import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { initialState as initialMoviesState } from '../store/movies/reducer';

import '../styles.css';

export const defaultState = {
  movies: initialMoviesState
};


interface AppProps {
  pageProps: any;
  Component: any;
}
 
const MyApp: React.FunctionComponent<AppProps> = ({Component, pageProps}): JSX.Element =>  {
  const store = makeStore(defaultState);
  // const persistor = persistStore(store);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
        <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  )
};

export default MyApp;
