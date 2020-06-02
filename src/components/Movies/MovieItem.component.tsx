import * as React from 'react';
import { Movie } from '../Movies/MoviesList.component';
import css from './Movies.module.css';
import img from '../../images/movie_temp.png';


interface MoviesItemProps {
  movie: Movie;
}

const MovieItem: React.FunctionComponent<MoviesItemProps> = (props): JSX.Element => {
  return (
    <section className={`d-flex ${css.container} ${css.movieItem}`}>
      <div style={{paddingRight: '50px'}}><img src={img} alt='Movie card'/></div>
      <div>
        <div className='d-flex'>
          <h1 className='extra-light' style={{paddingRight: '30px'}}>{props.movie.title}</h1>
          <p>{props.movie.rating}</p>
        </div>
        <p>{props.movie.genre}</p>
        <div className='d-flex'>
          <p style={{paddingRight: '30px'}}>{props.movie.year}</p>
          <p>{props.movie.duration}</p>
        </div>
        <p>{props.movie.description}</p>
      </div>     
    </section>
  );
};

export default MovieItem;
  