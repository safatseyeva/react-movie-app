import * as React from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadMoviesStart, loadMovieItemStart, clearMovieItem} from '../../store/movies/actions';
import { AppState } from '../../store/rootReducer';

import { useHistory, useParams } from 'react-router-dom';

import Header from '../Header/Header.component';
import MovieItem from '../Movies/MovieItem.component';
import MoviesList from '../Movies/MoviesList.component';
import { SearchParams } from '../MoviesPage/MoviesPage.component';
import { Movie } from '../../store/movies/types';
import css from './MovieItemPage.module.css';


interface RouteParams {
  id: string
}

export interface MovieItemPageProps {
  list?: Array<Movie>;
  loading?: boolean;
  error?: string;
  filter?: Array<string>;
  activeMovie?: Movie;
  searchParams: SearchParams;
  getMovies(searchParams: SearchParams, sortBy: string, filter: Array<string>): void;
  getMovieItem(id: number|string): void;
  clearMovieItem(): void;
}

const MovieItemPage: React.FunctionComponent<MovieItemPageProps> = (props): JSX.Element => {
  const history = useHistory();
  const locationParams = useParams<RouteParams>();

  useEffect(() => {
    const movieId = locationParams.id;
    props.getMovieItem(movieId);

  }, [locationParams]);

  useEffect(() => {
    if (props.activeMovie && props.activeMovie.genres) {
      props.getMovies({search: '', searchBy: ''}, '', props.activeMovie.genres);
    }
    
  }, [props.activeMovie]);


  const onMovieClick = (clickedItem: Movie): void => {
    props.getMovieItem(clickedItem.id);
  };

  const onBackToSearchClick = (): void => {
    props.clearMovieItem();
    const url = (props.searchParams.search && props.searchParams.searchBy) ? 
      `/search?searchStr=${props.searchParams.search}&searchBy=${props.searchParams.searchBy}` : '/';
    history.push(url);
  };

  const genres = props.activeMovie?.genres
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
        {props.activeMovie && <MovieItem activeMovie={props.activeMovie} />}
        <div className={`d-flex aline-items-center ${css.container}`}>
          <div className='bold'>Films by {genres} genre</div>
        </div>
        <MoviesList
          moviesToShow={props.list}
          onMovieClick={onMovieClick} />
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState)  => ({
  list: state.movies.list,
  loading: state.movies.loading,
  error: state.movies.error,
  filter: state.movies.filter,
  activeMovie: state.movies.activeMovie,
  searchParams: state.movies.searchParams
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovies: (searchParams: SearchParams, sortBy: string, filter: Array<string>) => 
    dispatch(loadMoviesStart(searchParams, sortBy, filter)),

  getMovieItem: (id: number|string) => dispatch(loadMovieItemStart(id)),

  clearMovieItem: () => dispatch(clearMovieItem())
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieItemPage);
  