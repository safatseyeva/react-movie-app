import * as React from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadMoviesStart, loadMovieItemStart, clearMovieItem} from '../../store/movies/actions';
import { AppState } from '../../store/rootReducer';

import Header from '../Header/Header.component';
import MovieItem from '../Movies/MovieItem.component';
import MoviesList from '../Movies/MoviesList.component';
import { SearchParams } from '../MoviesPage/MoviesPage.component';
import { Movie } from '../../store/movies/types';
import css from './MovieItemPage.module.css';


export interface MovieItemPageProps {
  movie: Movie;
  list?: Array<Movie>;
  loading?: boolean;
  error?: string;
  filter?: Array<string>;
  getMovies(searchParams: SearchParams, sortBy: string, filter: Array<string>): void;
  getMovieItem(id: number): void;
  clearMovieItem(): void;
}

const MovieItemPage: React.FunctionComponent<MovieItemPageProps> = (props): JSX.Element => {
  useEffect(() => {
    props.getMovies({search: '', searchBy: ''}, '', props.movie.genres);
  }, []);

  const onMovieClick = (clickedItem: Movie): void => {
    props.getMovieItem(clickedItem.id);
    const isEqual = clickedItem.genres.every(genre => props.filter?.includes(genre));
    if (!isEqual) {
      props.getMovies({search: '', searchBy: ''}, '', clickedItem.genres);
    }
  };

  const onBackToSearchClick = (): void => {
    props.clearMovieItem();
  };

  const genres = props.movie.genres
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
        <MovieItem movie={props.movie} />
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

const mapStateToProps = (state: AppState) => ({
  list: state.movies.list,
  loading: state.movies.loading,
  error: state.movies.error,
  filter: state.movies.filter
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovies: (searchParams: SearchParams, sortBy: string, filter: Array<string>) => 
    dispatch(loadMoviesStart(searchParams, sortBy, filter)),

  getMovieItem: (id: number) => dispatch(loadMovieItemStart(id)),

  clearMovieItem: () => dispatch(clearMovieItem())
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieItemPage);
  