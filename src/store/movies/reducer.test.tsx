import reducer from './reducer';
import * as types from './types';
import MoviesListMock from '../../components/Movies/MoviesList.mock';

const initialState = {
  list: [],
  activeMovie: undefined,
  loading: false,
  error: '',
  filter: []
};

describe('movies reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle LOAD_MOVIES_START', () => {
    expect(
      reducer(initialState, {
        type: types.LOAD_MOVIES_START,
        searchParams: {
          search: '',
          searchBy: ''
        },
        sortBy: '',
        filter: []
      })
    )
      .toEqual({
        list: [],
        activeMovie: undefined,
        loading: true,
        error: '',
        filter: []
      });
  });

  it('should handle LOAD_MOVIES_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.LOAD_MOVIES_SUCCESS,
        payload: MoviesListMock
      })
    )
      .toEqual({
        list: MoviesListMock,
        activeMovie: undefined,
        loading: false,
        error: '',
        filter: []
      });
  });

  it('should handle LOAD_MOVIE_ITEM_START', () => {
    expect(
      reducer(initialState, {
        type: types.LOAD_MOVIE_ITEM_START,
        id: '12345'
      })
    )
      .toEqual({
        list: [],
        activeMovie: undefined,
        loading: true,
        error: '',
        filter: []
      });
  });

  it('should handle LOAD_MOVIE_ITEM_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.LOAD_MOVIE_ITEM_SUCCESS,
        payload: MoviesListMock[0]
      })
    )
      .toEqual({
        list: [],
        activeMovie: MoviesListMock[0],
        loading: false,
        error: '',
        filter: ['Science Fiction', 'Action','Adventure']
      });
  });

});