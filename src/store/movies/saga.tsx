import { put, call, takeEvery, takeLatest, all, fork } from 'redux-saga/effects';
import * as actionCreators from './actions';
import * as actionTypes from './types';

import { getMovies, getMovieItem } from '../../services/Movies.service';


export function* onLoadMovies({searchParams, sortBy, filter}: actionTypes.LoadMoviesAction) {
  try {
    const { data } = yield call(() => getMovies(searchParams, sortBy, filter));
    yield put(actionCreators.loadMoviesSuccess(data.data));

  } catch (error) {
    yield put(actionCreators.loadMoviesError(error.data));
  }
}

function* onLoadMovieItem({id}: actionTypes.LoadMovieItemAction) {
  try {
    const { data } = yield call(getMovieItem, id);
    yield put(actionCreators.loadMovieItemSuccess(data));

  } catch (error) {
    yield put(actionCreators.loadMovieItemError(error.data));
  }
}


export function* watchOnLoadMovies() {
  yield takeEvery(actionTypes.LOAD_MOVIES_START, onLoadMovies);
}

function* watchOnLoadMovieItem() {
  yield takeLatest(actionTypes.LOAD_MOVIE_ITEM_START, onLoadMovieItem);
}

export default function* moviesSaga() {
  yield all([
    fork(watchOnLoadMovies),
    fork(watchOnLoadMovieItem)
  ]);
}
