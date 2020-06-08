import * as React from 'react';
import { useState } from 'react';
import Header from '../Header/Header.component';
import MovieItem from '../Movies/MovieItem.component';
import MoviesList, { Movie } from '../Movies/MoviesList.component';
import css from './MovieItemPage.module.css';

export interface MovieItemPageProps {
  movie: Movie;
  moviesToShow: Array<Movie>|undefined;
  onBackToSearchClicked(): void
}

const MovieItemPage: React.FunctionComponent<MovieItemPageProps> = (props): JSX.Element => {
  const [movie, setMovie] = useState<Movie>(props.movie);
  const [moviesToShow, setMoviesToShow] = useState(props.moviesToShow);

  const onMovieClick = (clickedItem: Movie) => {
    const moviesList = moviesToShow && moviesToShow.filter((item) => clickedItem.id !== item.id);
    moviesList?.push(movie);
    setMovie(clickedItem);
    setMoviesToShow(moviesList);
  };

  return (
    <React.Fragment>
      <Header>
        <div onClick={props.onBackToSearchClicked}
          style={{color:'#F65261'}}
          className='cursor-pointer bold'>
          Back to search
        </div>
      </Header>
      <section>
        <MovieItem movie={movie} />
        <div className={`d-flex aline-items-center ${css.container}`}>
          <div className='bold'>Films by {movie.genre} genre</div>
        </div>
        <MoviesList
          moviesToShow={moviesToShow}
          onMovieClick={onMovieClick} />
      </section>
    </React.Fragment>
  );
};

export default MovieItemPage;
  