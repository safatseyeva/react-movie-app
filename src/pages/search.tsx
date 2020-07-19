import * as React from 'react';

import {  makeStore } from '../store/';
import { defaultState } from './_app';
import { loadMoviesStart } from '../store/movies/actions';

import Footer from '../components/Footer/Footer.component';
import MoviesPage from '../components/MoviesPage/MoviesPage.component';


export async function getServerSideProps(context) {
  const { searchStr, searchBy, sortBy } = context.query;

  let store = makeStore(defaultState);
  
  store.dispatch(loadMoviesStart({ search: searchStr, searchBy: searchBy }, sortBy));
  store.stopSagaTask();
  await store.sagaTask.toPromise();

  return {
    props: {
      movies: store.getState().movies
    }
  };
}

const Search: React.FunctionComponent = (props): JSX.Element => {
  //@ts-ignore
  const { list, loading } = props.movies;
  
  return (
    <React.Fragment>
      <div className='main d-flex flex-column'>
        <MoviesPage list={list} loading={loading}/>
        <Footer/>
      </div>
    </React.Fragment>
  )
};

export default Search;