import { all, fork } from 'redux-saga/effects';
import MoviesSaga from './movies/saga';

export default function* rootSaga() {
  yield all([fork(MoviesSaga)]);
}
