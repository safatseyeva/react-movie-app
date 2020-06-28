import { expectSaga } from 'redux-saga-test-plan';
import { onLoadMovies, watchOnLoadMovies } from './saga';
import MoviesListMock from '../../components/Movies/MoviesList.component';
import * as types from './types';

const searchParams = {
  search: '',
  searchBy: ''
};
const sortBy = '';
const filter = [];

describe('movies fetching flow', () => {
  it('Dispatches LOAD_MOVIES_START', () => {
    return expectSaga(watchOnLoadMovies)
      .dispatch({
        type: types.LOAD_MOVIES_START,
        searchParams,
        sortBy,
        filter
      })

      .run({ silenceTimeout: true });
  });

  //test fails
  it('Dispatches LOAD_MOVIES_START', () => {
    //jest.mock(getMovies);
    // const generator = onLoadMovies({type: types.LOAD_MOVIES_START, searchParams, sortBy, filter});

    // expect(generator.next().value)
    //   .toEqual(call(getMovies));

    // expect(generator.next().value)
    //   .toEqual(put(
    //     {type: types.LOAD_MOVIES_SUCCESS, payload: []}
    //   ));

    return expectSaga(onLoadMovies, {type: types.LOAD_MOVIES_START, searchParams, sortBy, filter} )
      .put({
        type: types.LOAD_MOVIES_SUCCESS,
        payload: []
      })

      .run({ silenceTimeout: true });
  });

  // it('Handles exception as expected', () => {
  //   const generator = fetchMoviesSaga();
  //   expect(generator.next().value)
  //   .toEqual(put(
  //     {type: 'TOGGLE_LOADING', payload: true}
  //   ));
  //   expect(generator.next().value)
  //   .toEqual(call(fetchMoviesApi));
  //   expect(generator.throw('error').value)
  //   .toEqual(put(
  //     {type: 'TOGGLE_LOADING', payload: false}
  //   ));
  //   expect(generator.next().value)
  //   .toEqual(put(
  //    {type: 'ITEM_HAS_ERRORED', message: undefined}
  //   ));
  // });
});