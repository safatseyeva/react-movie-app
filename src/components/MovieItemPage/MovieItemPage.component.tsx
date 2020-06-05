import * as React from 'react';
import { useState } from 'react';
import Header from '../Header/Header.component';
import MovieItem from '../Movies/MovieItem.component';
import MoviesList, { Movie } from '../Movies/MoviesList.component';
import css from './MovieItemPage.module.css';

interface MoviesPageProps {
  movie: Movie;
  onBackToSearchClicked(): void
}

const MovieItemPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const [movie, setMovie] = useState<Movie>(props.movie);

  const onMovieClick = (movie: Movie) => {
    setMovie(movie);
  };

  const isBackToSearch = true;

  return (
    <React.Fragment>
      <Header isBackToSearch={isBackToSearch} onBackToSearchClicked={props.onBackToSearchClicked} />
      <section>
        <MovieItem movie={movie} />
        <div className={`d-flex aline-items-center ${css.container}`}>
          <div className='bold'>Films by {movie.genre} genre</div>
        </div>
        <MoviesList 
          filterBy='genre'
          activeMovieId={movie.id}
          onMovieClick={onMovieClick} />
      </section>
    </React.Fragment>
  );
};

export default MovieItemPage;
  