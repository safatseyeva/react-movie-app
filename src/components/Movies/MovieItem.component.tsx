import * as React from 'react';
import { createUseStyles } from 'react-jss';

import { Movie } from '../../store/movies/types';
//import css from './Movies.module.css';


const useStyles = createUseStyles({
  container: {
    margin: '60px'
  },
  movieCard: {
    flexGrow: 1,
    marginTop: '20px',
    maxWidth: '320px',
    '& img': {
      maxWidth: '320px'
    }
  },
  movieItem: {
    margin: '0px 60px 25px',
    padding: '20px 60px 30px',
    background: '#555',
    '& img': {
      maxWidth: '280px'
    }
  }
});


interface MovieItemProps {
  activeMovie: Movie;
}

const MovieItem: React.FunctionComponent<MovieItemProps> = (props): JSX.Element => {
  const css = useStyles();
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
  