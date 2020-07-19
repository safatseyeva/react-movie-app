import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';


let store;

export const makeStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWareEnhancer = applyMiddleware(sagaMiddleware);
  store = createStore(
    rootReducer, 
    initialState,
    composeWithDevTools(middleWareEnhancer)
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  store.stopSagaTask = async () => {
    store.dispatch(END);

    await store.sagaTask.done;
  }

  return store;
};
