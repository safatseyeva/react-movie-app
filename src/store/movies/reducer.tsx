import { fromJS } from 'immutable';
import memoize from 'fast-memoize';

import {
  MoviesState,
  LOAD_MOVIES_START, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_ERROR,
  LOAD_MOVIE_ITEM_START, LOAD_MOVIE_ITEM_SUCCESS, LOAD_MOVIE_ITEM_ERROR,
  CLEAR_MOVIE_ITEM, RESET_STORE,
  MoviesActionTypes
} from './types';


export const initialState: MoviesState = fromJS({
  list: [],
  activeMovie: undefined,
  loading: false,
  error: '',
  filter: []
});
  
const moviesReducer = (
  state = initialState,
  action: MoviesActionTypes
): MoviesState => {
  
  switch (action.type) {
  case LOAD_MOVIES_START:
    //@ts-ignore
    return state.set('loading', true);

  case LOAD_MOVIES_SUCCESS:
    return state
      //@ts-ignore
      .set('list', fromJS(action.payload))
      .set('loading', false);

  case LOAD_MOVIES_ERROR:
    return state
      //@ts-ignore
      .set('list', fromJS([]))
      .set('error', fromJS(action.payload))
      .set('loading', false);

  case LOAD_MOVIE_ITEM_START:
    //@ts-ignore
    return state.set('loading', true);

  case LOAD_MOVIE_ITEM_SUCCESS:
    return state
      //@ts-ignore
      .set('activeMovie', fromJS(action.payload))
      .set('filter', fromJS(action.payload.genres))
      .set('loading', false);

  case LOAD_MOVIE_ITEM_ERROR:
    return state
      //@ts-ignore
      .set('activeMovie', undefined)
      .set('filter', fromJS([]))
      .set('error', fromJS(action.payload))
      .set('loading', false);

  case CLEAR_MOVIE_ITEM:
    return state
      //@ts-ignore
      .set('activeMovie', undefined)
      .set('filter', fromJS([]));

  case RESET_STORE:
    return initialState;

  default:
    return state;
  }
};

const memoizedGetList = memoize(localState => localState.get('list').toJS());
const memoizedGetLoading = memoize(localState => localState.get('loading'));
const memoizedGetActiveMovie = memoize(localState => localState.get('activeMovie')?.toJS());
const memoizedGetFilter = memoize(localState => localState.get('filter')?.toJS());

export const getMoviesList = (state) => memoizedGetList(state);
export const getMoviesLoading = (state) => memoizedGetLoading(state);
export const getActiveMovie = (state) => memoizedGetActiveMovie(state);
export const getFilter = (state) => memoizedGetFilter(state);

export default moviesReducer;
  