import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import * as actions from './actions';
import * as types from './types';


const searchParams = {
  search: '',
  searchBy: ''
};
const sortBy = '';

describe('Movies Sync Actions', () => {
  it('should create an action loadMoviesStart', () => {
    const expectedAction = {
      type: types.LOAD_MOVIES_START,
      searchParams,
      sortBy
    };
    expect(actions.loadMoviesStart(searchParams, sortBy)).toEqual(expectedAction);
  });

  it('should create an action clearMovieItem', () => {
    const expectedAction = {
      type: types.CLEAR_MOVIE_ITEM
    };
    expect(actions.clearMovieItem()).toEqual(expectedAction);
  });

  it('should create an action loadMovieItemStart', () => {
    const expectedAction = {
      type: types.LOAD_MOVIE_ITEM_START,
      id: 12345
    };
    expect(actions.loadMovieItemStart(12345)).toEqual(expectedAction);
  });
});
