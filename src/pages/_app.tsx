import React from 'react';
import { makeStore } from '../store';
import { AppProps } from 'next/app';

import { Provider } from 'react-redux';

import { initialState as initialMoviesState } from '../store/movies/reducer';
import ErrorBoundary from '../ErrorBoundary.component';

import '../styles.css';


export const defaultState = {
  movies: initialMoviesState
};
 

const MyApp: React.FunctionComponent<AppProps> = ({Component, pageProps}): JSX.Element =>  {
  const store = makeStore(defaultState);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  )
};

export default MyApp;
