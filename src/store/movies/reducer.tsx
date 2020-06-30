import {
  MoviesState,
  LOAD_MOVIES_START, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_ERROR,
  LOAD_MOVIE_ITEM_START, LOAD_MOVIE_ITEM_SUCCESS, LOAD_MOVIE_ITEM_ERROR,
  CLEAR_MOVIE_ITEM, RESET_STORE,
  MoviesActionTypes
} from './types';


export const initialState: MoviesState = {
  list: [],
  activeMovie: undefined,
  loading: false,
  error: '',
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
      loading: true
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

  case RESET_STORE:
    return initialState;


  default:
    return state;
  }
};

export default moviesReducer;
  