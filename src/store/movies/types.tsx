import { SearchParams } from '../../components/MoviesPage/MoviesPage.component';

export interface Movie {
  id: number|string;
  title: string;
  release_date: string;
  genres: Array<string>;
  vote_average: number;
  overview: string;
  poster_path: string;
}

export interface MoviesState {
  list: Array<Movie>;
  activeMovie: Movie|null;
  loading: boolean;
  error?: string;
  filter: Array<string>;
}

export const LOAD_MOVIES_START = 'LOAD_MOVIES_START';
export const LOAD_MOVIES_SUCCESS = 'LOAD_MOVIES_SUCCESS';
export const LOAD_MOVIES_ERROR = 'LOAD_MOVIES_ERROR';
export const LOAD_MOVIE_ITEM_START = 'LOAD_MOVIE_ITEM_START';
export const LOAD_MOVIE_ITEM_SUCCESS = 'LOAD_MOVIE_ITEM_SUCCESS';
export const LOAD_MOVIE_ITEM_ERROR = 'LOAD_MOVIE_ITEM_ERROR';
export const CLEAR_MOVIE_ITEM = 'CLEAR_MOVIE_ITEM';
export const RESET_STORE = 'RESET_STORE';


export interface LoadMoviesAction {
  type: typeof LOAD_MOVIES_START;
  searchParams: SearchParams;
  sortBy: string;
  filter: Array<string>;
}

export interface LoadMoviesSuccessAction {
  type: typeof LOAD_MOVIES_SUCCESS;
  payload: Array<Movie>;
}

export interface LoadMoviesErrorAction {
  type: typeof LOAD_MOVIES_ERROR;
  payload: string;
}

export interface LoadMovieItemAction {
  type: typeof LOAD_MOVIE_ITEM_START,
  id: number|string;
}

export interface LoadMovieItemSuccessAction {
  type: typeof LOAD_MOVIE_ITEM_SUCCESS;
  payload: Movie;
}

export interface LoadMovieItemErrorAction {
  type: typeof LOAD_MOVIE_ITEM_ERROR;
  payload: string;
}

export interface ClearMovieItemAction {
  type: typeof CLEAR_MOVIE_ITEM;
}

export interface ResetStoreAction {
  type: typeof RESET_STORE;
}

export type MoviesActionTypes = 
  LoadMoviesAction 
  | LoadMoviesSuccessAction 
  | LoadMoviesErrorAction
  | LoadMovieItemAction
  | LoadMovieItemSuccessAction
  | LoadMovieItemErrorAction
  | ClearMovieItemAction
  | ResetStoreAction;
