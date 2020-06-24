import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';


const persistConfig = {
  key: 'root',
  storage
};


const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middleWareEnhancer = applyMiddleware(sagaMiddleware);
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};

export default configureStore;
