import { Movie } from './types';
import * as actions from './types';
import { SearchParams } from '../../components/MoviesPage/MoviesPage.component';


export const loadMoviesStart = (searchParams: SearchParams, sortBy: string, filter?: Array<string>) => {
  return {
    type: actions.LOAD_MOVIES_START,
    searchParams,
    sortBy,
    filter
  };
};

export const loadMoviesSuccess = (movies: Array<Movie>) => {
  return {
    type: actions.LOAD_MOVIES_SUCCESS,
    payload: movies
  };
};

export const loadMoviesError = (error: string) => {
  return {
    type: actions.LOAD_MOVIES_ERROR,
    payload: error
  };
};

export const loadMovieItemStart = (id: number|string) => {
  return {
    type: actions.LOAD_MOVIE_ITEM_START,
    id
  };
};

export const loadMovieItemSuccess = (activeMovie: Movie) => {
  return {
    type: actions.LOAD_MOVIE_ITEM_SUCCESS,
    payload: activeMovie
  };
};

export const loadMovieItemError = (error: string) => {
  return {
    type: actions.LOAD_MOVIE_ITEM_ERROR,
    payload: error
  };
};

export const clearMovieItem = () => {
  return {
    type: actions.CLEAR_MOVIE_ITEM
  };
};

export const resetStore = () => {
  return {
    type: actions.RESET_STORE
  };
};
