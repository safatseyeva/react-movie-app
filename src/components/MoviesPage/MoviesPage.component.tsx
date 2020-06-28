import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMoviesStart, loadMovieItemStart, updateSearchParams, updateSortBy } 
  from '../../store/movies/actions';
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
  searchParams: SearchParams,
  sortBy: string;
  getMovies(searchParams: SearchParams, sortBy: string): void;
  getMovieItem(id: number): void;
  updateSearchParams(searchParams: SearchParams): void;
  updateSortBy(sortBy: string): void;
}

export interface SearchParams {
  search: string;
  searchBy: string;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  useEffect(() => {
    const sorting = sortSwitcherSettings.fields 
      && sortSwitcherSettings.fields[sortSwitcherSettings.activeId] || '';

    props.updateSortBy(sorting);
  }, []);

  useEffect(() => {
    if (props.sortBy) {
      props.getMovies(props.searchParams, props.sortBy);
    }
  }, [props.searchParams, props.sortBy]);

  const onMovieClick = (movie: Movie): void => {
    props.getMovieItem(movie.id);
  };

  return (
    <React.Fragment>
      <Header/>
      <section>
        <Search onSearch={props.updateSearchParams} />
        <ResultsHeader resultsNumber={props.list && props.list.length} onSort={props.updateSortBy} />
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
  error: state.movies.error,
  searchParams: state.movies.searchParams,
  sortBy: state.movies.sortBy
});

const mapDispatchToProps = (dispatch: any) => ({
  getMovies: (searchParams: SearchParams, sortBy: string) => dispatch(loadMoviesStart(searchParams, sortBy)),
  getMovieItem: (id: number) => dispatch(loadMovieItemStart(id)),
  updateSearchParams: (searchParams: SearchParams) => dispatch(updateSearchParams(searchParams)),
  updateSortBy: (sortBy: string) => dispatch(updateSortBy(sortBy))
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MoviesPage);
  