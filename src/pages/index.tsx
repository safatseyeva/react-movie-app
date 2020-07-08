import * as React from 'react';

import { bindActionCreators } from 'redux';
import { getStore } from '../store/';

import { resetStore } from '../store/movies/actions';
import { initialState } from '../store/movies/reducer';
import * as actionCreators from '../store/movies/actions';


import Footer from '../components/Footer/Footer.component';
import MoviesPage from '../components/MoviesPage/MoviesPage.component';

// const PageNotFound: React.FunctionComponent = (): JSX.Element => {
//   return (
//     <div>Page Not Found</div>
//   );
// };


const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className='main d-flex flex-column'>
        <MoviesPage />
        <Footer/>
      </div>
    </React.Fragment>
  );
};

export default App;
