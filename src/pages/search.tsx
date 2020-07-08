import * as React from 'react';

import App from './index';

import { getStore, makeStore } from '../store/';
import { defaultState } from './_app';
import { loadMoviesStart, resetStore } from '../store/movies/actions';
import { initialState } from '../store/movies/reducer';
import { Context } from 'next-redux-wrapper';
import { AppContextType } from 'next/dist/next-server/lib/utils';


export async function getServerSideProps(context) {
  const { searchStr, searchBy, sortBy } = context.query;

  let reduxStore = getStore();

  if (reduxStore) {
    reduxStore.dispatch(loadMoviesStart({search: searchStr, searchBy: searchBy}, sortBy));
    await reduxStore.sagaTask.done;

    return {
      props: reduxStore.getState()
    };

  } else {
    reduxStore = makeStore(defaultState);

    return {
      props: defaultState
    };
  }

}


const Search: React.FunctionComponent = (): JSX.Element => {
  return <App />;
};

export default Search;