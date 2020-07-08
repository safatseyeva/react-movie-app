import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { createWrapper } from 'next-redux-wrapper';


// const persistConfig = {
//   key: 'root',
//   storage
// };

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
}

export const getStore = () => store;


//export const wrapper = createWrapper(makeStore, { debug: true });


// const sagaMiddleware = createSagaMiddleware();
// const middleWareEnhancer = applyMiddleware(sagaMiddleware);
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const makeStore = (initialState = defaultState) => {
//   return createStore(
//     persistedReducer,
//     initialState,
//     composeWithDevTools(middleWareEnhancer)
//   )
// };

// const bindMiddleware = (middleware) => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension')
//     return composeWithDevTools(applyMiddleware(...middleware))
//   }
//   return applyMiddleware(...middleware)
// }


// let store;

// export const initializeStore = (preloadedState?) => {
//   let _store = store ?? makeStore(preloadedState)

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = makeStore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') {
//     return _store;
//   } 
//   // Create the store once in the client
//   if (!store) {
//     store = _store;
//   }

//   _store.sagaTask = sagaMiddleware.run(rootSaga);

//   return _store;
// }

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }



