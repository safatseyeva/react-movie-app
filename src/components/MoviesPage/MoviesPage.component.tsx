import * as React from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadMoviesStart, resetStore } 
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
  getMovies(searchParams: SearchParams, sortBy: string): void;
  resetStore(): void;
}

export interface SearchParams {
  search: string;
  searchBy: string;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/') {
      props.resetStore();

    } else {
      const query = new URLSearchParams(location.search);
      const searchParams = getSearchParams(query);
      const sortBy = query.get('sortBy') || '';

      if (!searchParams.search) {
        props.resetStore();
        return;
      }

      props.getMovies(searchParams, sortBy);  
    }

  }, [location]);


  const getSearchParams = (query: URLSearchParams) => {
    return {
      search: query.get('searchStr') || '',
      searchBy: query.get('searchBy') || ''
    };
  };

  const changeUrl = (searchParams: SearchParams, sortBy: string) => {
    const url = searchParams.search ? 
      `/search?searchStr=${searchParams.search}&searchBy=${searchParams.searchBy}&sortBy=${sortBy}`
      : `/search?sortBy=${sortBy}`;
    history.push(url);
  };

  const onSearch = (searchParams: SearchParams) => {
    const query = new URLSearchParams(location.search);
    const sortBy = query.get('sortBy') || sortSwitcherSettings.fields 
      && sortSwitcherSettings.fields[sortSwitcherSettings.activeId] || '';
    changeUrl(searchParams, sortBy);
  };

  const onSort = (sortBy: string) => {
    const query = new URLSearchParams(location.search);
    const searchParams = getSearchParams(query);
    changeUrl(searchParams, sortBy);
  };

  const onMovieClick = (movie: Movie): void => {
    history.push(generatePath('/movie/:id/', { id: movie.id}));
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
  resetStore: () => dispatch(resetStore())
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MoviesPage);
  