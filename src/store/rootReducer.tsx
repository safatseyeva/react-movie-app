import { combineReducers } from 'redux';
import moviesReducer from './movies/reducer';

const rootReducer = combineReducers({
  movies: moviesReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
