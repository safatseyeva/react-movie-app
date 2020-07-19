import * as React from 'react';

import { initialState } from '../store/movies/reducer';

import Footer from '../components/Footer/Footer.component';
import MoviesPage from '../components/MoviesPage/MoviesPage.component';

const App: React.FunctionComponent = (): JSX.Element => {
  const { list, loading } = initialState;

  return (
    <React.Fragment>
      <div className='main d-flex flex-column'>
        <MoviesPage list={list} loading={loading} />
        <Footer/>
      </div>
    </React.Fragment>
  );
};

export default App;
