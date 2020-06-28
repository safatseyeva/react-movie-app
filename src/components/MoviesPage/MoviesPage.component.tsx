import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMoviesStart, loadMovieItemStart } from '../../store/movies/actions';
import { AppState } from '../../store/rootReducer';

import Header from '../Header/Header.component';
import Search from '../Search/Search.component';
import ResultsHeader from '../ResultsHeader/ResultsHeader.component';
import MoviesList from '../Movies/MoviesList.component';

import { Movie } from '../../store/movies/types';
import { sortSwitcherSettings } from '../ResultsHeader/ResultsHeader.component';


interface MoviesPageProps {
  list: Array<Movie>;
  loading: boolean;
  error?: string;
  getMovies(searchParams: SearchParams, sortBy: string): void;
  getMovieItem(id: number): void;
}

export interface SearchParams {
  search: string;
  searchBy: string;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: '',
    searchBy: ''
  });
  const [sortBy, setSortBy] = sortSwitcherSettings.fields ? 
    useState(sortSwitcherSettings.fields[sortSwitcherSettings.activeId]) : useState('');

  useEffect(() => {
    if (sortBy) {
      props.getMovies(searchParams, sortBy);
    }
  }, [searchParams, sortBy]);

  const onSearch = (searchObj: SearchParams): void => {
    setSearchParams(searchObj);
  };

  const onSort = (sortType: string): void => {
    setSortBy(sortType);
  };

  const onMovieClick = (movie: Movie): void => {
    props.getMovieItem(movie.id);
  };

  return (
    <React.Fragment>
      <Header/>
      <section>
        <Search onSearch={onSearch} />
        <ResultsHeader resultsNumber={props.list && props.list.length} onSort={onSort} />
        {props.loading ? 
          (<div>Loading...</div>) :
          <MoviesList 
            moviesToShow={props.list}
            onMovieClick={onMovieClick} />
        }
      </section> 
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState) => ({
  list: state.movies.list,
  loading: state.movies.loading,
  error: state.movies.error 
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovies: (searchParams: SearchParams, sortBy: string) => dispatch(loadMoviesStart(searchParams, sortBy)),
  getMovieItem: (id: number) => dispatch(loadMovieItemStart(id))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MoviesPage);
  