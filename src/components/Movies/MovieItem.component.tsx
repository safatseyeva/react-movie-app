import * as React from 'react';
import { Movie } from '../../store/movies/types';
import css from './Movies.module.css';


interface MovieItemProps {
  activeMovie: Movie;
}

const MovieItem: React.FunctionComponent<MovieItemProps> = (props): JSX.Element => {
  const genres = props.activeMovie.genres
    .map((genre) => (<span key={genre} style={{paddingLeft: '5px'}}>{genre}</span>));
  
  return (
    <section className={`d-flex ${css.container} ${css.movieItem}`}>
      <div style={{paddingRight: '50px'}}><img src={props.activeMovie.poster_path} alt='Movie card'/></div>
      <div>
        <div className='d-flex'>
          <h1 data-testid='movie-item-name' className='extra-light' style={{paddingRight: '30px'}}>{props.activeMovie.title}</h1>
          <p>{props.activeMovie.vote_average}</p>
        </div>
        <p>{genres}</p>
        <div className='d-flex'>
          <p style={{paddingRight: '30px'}}>{props.activeMovie.release_date}</p>
        </div>
        <p>{props.activeMovie.overview}</p>
      </div>     
    </section>
  );
};

export default MovieItem;
  