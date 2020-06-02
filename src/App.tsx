import * as React from 'react';
import { useState } from 'react';
import Footer from './components/Footer/Footer.component';
import MoviesPage from './components/MoviesPage/MoviesPage.component';
import MovieItemPage from './components/MovieItemPage/MovieItemPage.component';
import { Movie } from './components/Movies/MoviesList.component';
import ErrorBoundary from './ErrorBoundary.component';

const App: React.FunctionComponent = ():JSX.Element => {
  const [movieItem, setMovieItem] = useState<Movie>();

  const onMovieClick = (movie: Movie) => {
    setMovieItem(movie);
  };

  const onBackToSearchClicked = () => {
    setMovieItem(undefined);
  };

  return (
    <ErrorBoundary>
      <div className='main d-flex flex-column'>
        {movieItem ? 
          <MovieItemPage movie={movieItem} onBackToSearchClicked={onBackToSearchClicked} /> 
          : <MoviesPage onMovieClick={onMovieClick}/>}
        <Footer/>
      </div>
    </ErrorBoundary>
  );
};

export default App;
