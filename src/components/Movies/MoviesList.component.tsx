import * as React from 'react';
import MoviesListMock from './MoviesList.mock';
import MovieCard from './MovieCard.component';
import { sortSwitcherSettings } from '../ResultsHeader/ResultsHeader.component';
import { SearchParams } from '../MoviesPage/MoviesPage.component';
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
  searchParams?: SearchParams;
  sortBy?: string;
  filterBy?: string;
  activeMovieId?: number;
  onMoviesNumberChanged?(moviesNumber: number): void;
  onMovieClick(movie: Movie): void
}

interface MoviesListState {
  movies: Array<Movie>;
}

type GenericObject = { 
  [key: string]: any;
};

class MoviesList extends React.Component<MoviesListProps, MoviesListState> {
  private moviesArr: Array<Movie> = [];

  constructor(props: MoviesListProps) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount(): void {
    this.setState({ movies: MoviesListMock });
  }

  componentDidUpdate(): void {
    if (this.props.onMoviesNumberChanged) {
      this.props.onMoviesNumberChanged(this.moviesArr.length);
    }
  }

  search = (): void => {
    this.moviesArr = this.moviesArr.filter((movie: GenericObject) => {
      const movieValue = this.props.searchParams && movie[this.props.searchParams.searchType].toLowerCase();
      return this.props.searchParams && movieValue.indexOf(this.props.searchParams.searchStr.toLowerCase()) > -1;
    });
  }

  sort = (): void => {
    const defaultSorting = sortSwitcherSettings.options[sortSwitcherSettings.activeId];
    const sorting = (!this.props.sortBy || this.props.sortBy === defaultSorting) ? 
      'year' : this.props.sortBy;

    this.moviesArr.sort((a: GenericObject, b: GenericObject) => b[sorting] - a[sorting]);
  }

  filter = (): void => {
    const genre = this.moviesArr
      .find((movie: Movie) => movie.id === this.props.activeMovieId)?.genre;

    this.moviesArr = this.moviesArr
      .filter((movie: Movie) => movie.genre === genre && movie.id !== this.props.activeMovieId);
  }

  render(): React.ReactNode {
    if (this.state.movies.length) {
      this.moviesArr = [...this.state.movies];

      if (this.props.searchParams && this.props.searchParams.searchStr) {
        this.search();
      }

      if (this.moviesArr.length) {
        if (this.props.filterBy && this.props.activeMovieId) {
          this.filter();

        } else {
          this.sort();
        }
          
        const MoviesComponents: Array<JSX.Element> = this.moviesArr.map((movie: Movie) => (
          <div key={movie.id} onClick={() => this.props.onMovieClick(movie)} className='cursor-pointer'>
            <MovieCard item={movie} />
          </div>
        ));
    
        return <div className={`d-flex flex-wrap justify-between ${css.container}`}>{MoviesComponents}</div>;
      }

      return <div className={`d-flex ${css.container}`}>No Films Found</div>;
      
    } else {
      return <div className={`d-flex ${css.container}`}>No Films Found</div>;
    }

  }
}

export default MoviesList;
