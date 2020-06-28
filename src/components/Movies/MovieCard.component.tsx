import * as React from 'react';
import * as css from './Movies.module.css';
import { Movie } from '../../store/movies/types';


interface MovieCardProps {
  item: Movie
}

const MovieCard: React.FunctionComponent<MovieCardProps> = (props): JSX.Element => {
  const genres = props.item.genres
    .map((genre, index) => (<span key={index} style={{paddingLeft: '5px'}}>{genre}</span>));

  return (
    <div className={css.movieCard}>
      <img src={props.item.poster_path} alt='Movie card' />
      <div className='d-flex justify-between'>
        <div>
          <h4 style={{margin: '10px 0'}} className='medium'>{props.item.title}</h4>
          <div style={{margin: '10px 0', fontSize: '14px'}}>{genres}</div>
        </div>
        <p style={{margin: '10px 0'}}>{props.item.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
