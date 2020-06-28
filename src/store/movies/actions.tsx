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

export const loadMovieItemStart = (id: number) => {
  return {
    type: actions.LOAD_MOVIE_ITEM_START,
    id
  };
};

export const loadMovieItemSuccess = (movie: Movie) => {
  return {
    type: actions.LOAD_MOVIE_ITEM_SUCCESS,
    payload: movie
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

export const updateSearchParams = (searchParams: SearchParams) => {
  return {
    type: actions.UPDATE_SEARCH_PARAMS,
    payload: searchParams
  };
};

export const updateSortBy = (sortBy: string) => {
  return {
    type: actions.UPDATE_SORT_BY,
    payload: sortBy
  };
};
