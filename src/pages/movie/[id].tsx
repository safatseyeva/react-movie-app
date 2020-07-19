import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { loadMoviesStart, loadMovieItemStart } from '../../store/movies/actions';

import { makeStore } from '../../store/';
import { defaultState } from '../_app';

import Header from '../../components/Header/Header.component';
import MovieItem from '../../components/Movies/MovieItem.component';
import { Movie } from '../../store/movies/types';
import css from './MovieItemPage.module.css';


export async function getServerSideProps(context) {
  const { id } = context.query;

  let store = makeStore(defaultState);
  
  store.dispatch(loadMovieItemStart(id));
  store.stopSagaTask();
  await store.sagaTask.toPromise();

  const movies = store.getState().movies;

  if (movies.activeMovie && movies.activeMovie.genres) {
    store.dispatch(loadMoviesStart({search: '', searchBy: ''}, '', movies.activeMovie.genres));
    store.stopSagaTask();
    await store.sagaTask.toPromise();
  }

  return {
    props: store.getState().movies
  };
}


const MovieItemPage: React.FunctionComponent = (props): JSX.Element => {
  const MoviesList = dynamic(import('../../components/Movies/MoviesList.component'));
  const router = useRouter();
  //@ts-ignore
  const { activeMovie, list } = props; 

  const onMovieClick = (clickedItem: Movie): void => {
    router.push('/movie/' + clickedItem.id);
  };

  const onBackToSearchClick = (): void => {
    router.back();
  };

  const genres = activeMovie?.genres
    .map((genre, index) => (<span key={index} style={{paddingLeft: '5px'}}>{genre}</span>));


  return (
    <React.Fragment>
      <Header>
        <div onClick={onBackToSearchClick}
          style={{color:'#F65261'}}
          className='cursor-pointer bold'>
          Back to search
        </div>
      </Header>
      <section>
        {activeMovie && <MovieItem activeMovie={activeMovie} />}
        <div className={`d-flex aline-items-center ${css.container}`}>
          <div className='bold'>Films by {genres} genre</div>
        </div>
        {list.length &&
          <MoviesList
            moviesToShow={list}
            onMovieClick={onMovieClick} />
        }
      </section>
    </React.Fragment>
  );
};

export default MovieItemPage;
