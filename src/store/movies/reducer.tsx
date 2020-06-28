import {
  MoviesState,
  LOAD_MOVIES_START, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_ERROR,
  LOAD_MOVIE_ITEM_START, LOAD_MOVIE_ITEM_SUCCESS, LOAD_MOVIE_ITEM_ERROR,
  CLEAR_MOVIE_ITEM, UPDATE_SEARCH_PARAMS, UPDATE_SORT_BY,
  MoviesActionTypes
} from './types';


export const initialState: MoviesState = {
  list: [],
  activeMovie: undefined,
  loading: false,
  error: '',
  searchParams: {
    search: '',
    searchBy: ''
  },
  sortBy: '',
  filter: []
};
  
const moviesReducer = (
  state = initialState,
  action: MoviesActionTypes
): MoviesState => {
  
  switch (action.type) {
  case LOAD_MOVIES_START:
    return { 
      ...state,
      loading: true,
      searchParams: action.searchParams,
      sortBy: action.sortBy
    };

  case LOAD_MOVIES_SUCCESS:
    return {
      ...state,
      list: action.payload,
      loading: false
    };

  case LOAD_MOVIES_ERROR:
    return {
      ...state,
      list: [],
      error: action.payload,
      loading: false
    };

  case LOAD_MOVIE_ITEM_START:
    return { 
      ...state,
      loading: true
    };

  case LOAD_MOVIE_ITEM_SUCCESS:
    return {
      ...state,
      activeMovie: action.payload,
      filter:  action.payload.genres,
      loading: false
    };

  case LOAD_MOVIE_ITEM_ERROR:
    return {
      ...state,
      activeMovie: undefined,
      filter: [],
      error: action.payload,
      loading: false
    };

  case CLEAR_MOVIE_ITEM:
    return {
      ...state,
      activeMovie: undefined,
      filter: []
    };

  case UPDATE_SEARCH_PARAMS:
    return { 
      ...state,
      searchParams: action.payload
    };

  case UPDATE_SORT_BY:
    return { 
      ...state,
      sortBy: action.payload
    };


  default:
    return state;
  }
};

export default moviesReducer;
  