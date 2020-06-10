import * as React from 'react';
import MovieCard from './MovieCard.component';
import * as css from './Movies.module.css';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  description: string;
}

interface MoviesListProps {
  moviesToShow: Array<Movie>|undefined;
  onMovieClick(movie: Movie): void
}

class MoviesList extends React.Component<MoviesListProps> {
  render(): React.ReactNode {
    if (this.props.moviesToShow && this.props.moviesToShow.length) { 
      const MoviesComponents: Array<JSX.Element> = this.props.moviesToShow.map((movie: Movie) => (
        <div key={movie.id} 
          data-testid={`movieId_${movie.id}`}
          onClick={() => this.props.onMovieClick(movie)} 
          className='cursor-pointer'>
          <MovieCard item={movie} />
        </div>
      ));
  
      return <div className={`d-flex flex-wrap justify-between ${css.container}`}>{MoviesComponents}</div>;
    }

    return <div className={`d-flex ${css.container}`}>No Films Found</div>;
  }
}

export default MoviesList;
