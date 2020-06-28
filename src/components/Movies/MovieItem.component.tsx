import * as React from 'react';
import { Movie } from '../../store/movies/types';
import css from './Movies.module.css';


interface MoviesItemProps {
  movie: Movie;
}

const MovieItem: React.FunctionComponent<MoviesItemProps> = (props): JSX.Element => {
  const genres = props.movie.genres
    .map((genre) => (<span key={genre} style={{paddingLeft: '5px'}}>{genre}</span>));
  
  return (
    <section className={`d-flex ${css.container} ${css.movieItem}`}>
      <div style={{paddingRight: '50px'}}><img src={props.movie.poster_path} alt='Movie card'/></div>
      <div>
        <div className='d-flex'>
          <h1 data-testid='movie-item-name' className='extra-light' style={{paddingRight: '30px'}}>{props.movie.title}</h1>
          <p>{props.movie.vote_average}</p>
        </div>
        <p>{genres}</p>
        <div className='d-flex'>
          <p style={{paddingRight: '30px'}}>{props.movie.release_date}</p>
        </div>
        <p>{props.movie.overview}</p>
      </div>     
    </section>
  );
};

export default MovieItem;
  