import * as React from 'react';
import * as css from './Movies.module.css';
import img from '../../images/movie_temp.png';
import { Movie } from './MoviesList.component';


interface MovieCardProps {
  item: Movie
}

const MovieCard: React.FunctionComponent<MovieCardProps> = (props): JSX.Element => {
  return (
    <div className={css.movieCard}>
      <img src={img} alt='Movie card' />
      <div className='d-flex justify-between'>
        <div>
          <h4 style={{margin: '10px 0'}} className='medium'>{props.item.title}</h4>
          <p style={{margin: '10px 0', fontSize: '14px'}}>{props.item.genre}</p>
        </div>
        <p style={{margin: '10px 0'}}>{props.item.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
