import * as React from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadMoviesStart, updateSearchParams, updateSortBy, resetStore } 
  from '../../store/movies/actions';
import { AppState } from '../../store/rootReducer';

import { useLocation, useHistory } from 'react-router-dom';
import { generatePath } from 'react-router';

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
  updateSearchParams(searchParams: SearchParams): void;
  updateSortBy(sortBy: string): void;
  resetStore(): void;
}

export interface SearchParams {
  search: string|null;
  searchBy: string|null;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/') {
      resetStore();

    } else {
      const query = new URLSearchParams(location.search);
      const params = {
        search: query.get('searchStr'),
        searchBy: query.get('searchBy')
      };

      if (!params.search) {
        resetStore();
        return;
      }

      props.updateSearchParams(params);
    }

    //set sortBy from settings
    if (!props.sortBy) {
      const sorting = sortSwitcherSettings.fields 
        && sortSwitcherSettings.fields[sortSwitcherSettings.activeId] || '';

      props.updateSortBy(sorting);
    }
  }, [location]);

  useEffect(() => {
    if (props.searchParams.search && props.sortBy) {
      props.getMovies(props.searchParams, props.sortBy);
    }
  }, [props.searchParams, props.sortBy]);


  const resetStore = () => {
    setTimeout(() => {
      props.resetStore();
    }, 200);
  };

  const onMovieClick = (movie: Movie): void => {
    history.push(generatePath('/movie/:id/', { id: movie.id}));
  };

  const onSearch = (searchParams: SearchParams) => {
    const url = `/search?searchStr=${searchParams.search}&searchBy=${searchParams.searchBy}`;
    history.push(url);
  };

  return (
    <React.Fragment>
      <Header/>
      <section>
        <Search onSearch={onSearch} />
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
  updateSearchParams: (searchParams: SearchParams) => dispatch(updateSearchParams(searchParams)),
  updateSortBy: (sortBy: string) => dispatch(updateSortBy(sortBy)),
  resetStore: () => dispatch(resetStore())
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MoviesPage);
  