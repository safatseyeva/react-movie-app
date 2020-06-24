import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import fetchMock from 'fetch-mock';

import * as actions from './actions';
import * as types from './types';
import MoviesListMock from '../../components/Movies/MoviesList.mock';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureMockStore([sagaMiddleware]);

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


//test fails
describe('Movies Async Actions', () => {
  // afterEach(() => {
  //   fetchMock.restore()
  // });

  it('should create an action loadMoviesSuccess when mocies fetch is done', () => {
    // fetchMock.getOnce('/movies', {
    //   body: { data: MoviesListMock },
    //   headers: { 'content-type': 'application/json' }
    // });

    // function success() {
    //   return {
    //     type: types.LOAD_MOVIES_SUCCESS
    //   }
    // }
    
    // function loadMovies () {
    //   return async (dispatch) => {
    //     return await fetch('/movies') 
    //       .then(() => dispatch(success()))
    //   };
    // }
    const getMovies = jest.fn();

    const expectedActions = [
      { type: types.LOAD_MOVIES_START },
      { type: types.LOAD_MOVIES_SUCCESS, payload: MoviesListMock }
    ];
    const store = mockStore({ movies: [] });

    return store.dispatch(getMovies(searchParams, sortBy))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
