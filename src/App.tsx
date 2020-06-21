import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from './store/rootReducer';

import Footer from './components/Footer/Footer.component';
import MoviesPage from './components/MoviesPage/MoviesPage.component';
import MovieItemPage from './components/MovieItemPage/MovieItemPage.component';
import { Movie } from './store/movies/types';

interface AppProps {
  activeMovie: Movie | undefined;
}

const App: React.FunctionComponent<AppProps> = (props): JSX.Element => {
  return (
    <div className='main d-flex flex-column'>
      {props.activeMovie ? 
        <MovieItemPage movie={props.activeMovie}/> 
        : <MoviesPage />}
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeMovie: state.movies.activeMovie
});

export default connect(mapStateToProps)(App);
