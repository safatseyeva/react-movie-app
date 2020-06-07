import * as React from 'react';
import { useState } from 'react';
import Footer from './components/Footer/Footer.component';
import MoviesPage from './components/MoviesPage/MoviesPage.component';
import MovieItemPage from './components/MovieItemPage/MovieItemPage.component';
import { Movie } from './components/Movies/MoviesList.component';

const App: React.FunctionComponent = ():JSX.Element => {
  const [movieItem, setMovieItem] = useState<Movie>();
  const [moviesToShow, setMoviesToShow] = useState<Array<Movie>|undefined>();

  const onMovieClick = (movie: Movie, moviesToShow: Array<Movie>) => {
    setMovieItem(movie);
    setMoviesToShow(moviesToShow);
  };

  const onBackToSearchClicked = () => {
    setMovieItem(undefined);
    setMoviesToShow(undefined);
  };

  return (
    <div className='main d-flex flex-column'>
      {movieItem ? 
        <MovieItemPage movie={movieItem} moviesToShow={moviesToShow} onBackToSearchClicked={onBackToSearchClicked} /> 
        : <MoviesPage onMovieClick={onMovieClick}/>}
      <Footer/>
    </div>
  );
};

export default App;
