import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../store/rootReducer';


function render(
  ui: JSX.Element,
  {
    //@ts-ignore
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {

  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>;
  }

  //@ts-ignore
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
