import * as React from 'react';
import MoviesListMock from './MoviesList.mock';
import MovieCard from './MovieCard.component';
import { sortSwitcherSettings } from '../ResultsHeader/ResultsHeader.component';
import { SearchParams } from '../../App';
import * as css from './Movies.module.css';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
}

interface MoviesListProps {
  searchParams: SearchParams;
  sortBy: string;
  onMoviesNumberChanged(moviesNumber: number): void;
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
    this.props.onMoviesNumberChanged(this.moviesArr.length);
  }

  search = (): void => {
    this.moviesArr = this.moviesArr.filter((movie: GenericObject) => {
      const movieValue = movie[this.props.searchParams.searchType].toLowerCase();
      return movieValue.indexOf(this.props.searchParams.searchStr.toLowerCase()) > -1;
    });
  }

  sort = (): void => {
    const defaultSorting = sortSwitcherSettings.options[sortSwitcherSettings.activeId];
    const sorting = (!this.props.sortBy || this.props.sortBy === defaultSorting) ? 
      'year' : this.props.sortBy;

    this.moviesArr.sort((a: GenericObject, b: GenericObject) => b[sorting] - a[sorting]);
  }

  render(): React.ReactNode {
    if (this.state.movies.length) {
      this.moviesArr = [...this.state.movies];

      if (this.props.searchParams.searchStr) {
        this.search();
      }

      if (this.moviesArr.length) {
        this.sort();

        const MoviesComponents: Array<JSX.Element> = this.moviesArr.map((movie: Movie) => (
          <MovieCard key={movie.id} item={movie} />
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
