import * as React from 'react';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { connect } from 'react-redux';
import { loadMoviesStart, resetStore } 
  from '../../store/movies/actions';
import { AppState } from '../../store/rootReducer';

import { useLocation, useHistory } from 'react-router-dom';
import { defaultState } from '../_app';
import { getStore, makeStore } from '../../store/';
import { generatePath } from 'react-router';

import Header from '../../components/Header/Header.component';
import Search from '../../components/Search/Search.component';
import ResultsHeader from '../../components/ResultsHeader/ResultsHeader.component';
import MoviesList from '../../components/Movies/MoviesList.component';

import { Movie } from '../../store/movies/types';
import { sortSwitcherSettings } from '../../components/ResultsHeader/ResultsHeader.component';


interface MoviesPageProps {
  list: Array<Movie>;
  loading: boolean;
  error?: string;
  // getMovies(searchParams: SearchParams, sortBy: string): void;
  // resetStore(): void;
}

export interface SearchParams {
  search: string;
  searchBy: string;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const router = useRouter();
  
 // useEffect(() => {
  //   const { searchStr, searchBy, sortBy } = router.query;
  //   // console.log(searchStr);

  //   if (!searchStr) {
  //     //router.push('/', undefined, { shallow: true });
  //     props.resetStore();
  //   }

  //   if (router.pathname === '/') {
  //     props.resetStore();

  //   } else {
  //     // const query = new URLSearchParams(location.search);
  //     // const searchParams = getSearchParams(query);
  //     // const sortBy = query.get('sortBy') || '';

  //     if (!searchStr) {
  //       props.resetStore();
  //       return;
  //     }

  //     const searchParams = {
  //       search: searchStr, 
  //       searchBy: searchBy
  //     };

  //     //@ts-ignore
  //     //props.getMovies(searchParams, sortBy);  
  //   }

  // }, [router]);


  const changeUrl = (searchParams: SearchParams, sortBy: string) => {
    const url = searchParams.search ? 
      `/search?searchStr=${searchParams.search}&searchBy=${searchParams.searchBy}&sortBy=${sortBy}`
      : `/search?sortBy=${sortBy}`;
    router.push(url);
  };

  const onSearch = (searchParams: SearchParams) => {
    const sortBy = router.query.sortBy?.toString();
    const sorting = sortBy || sortSwitcherSettings.fields 
      && sortSwitcherSettings.fields[sortSwitcherSettings.activeId] || '';
    changeUrl(searchParams, sorting);
  };

  const onSort = (sortBy: string) => {
    const searchParams = {
      search: router.query.searchStr?.toString() || '',
      searchBy: router.query.searchBy?.toString() || ''
    }
    changeUrl(searchParams, sortBy);
  };

  const onMovieClick = (movie: Movie): void => {
    router.push(generatePath('/movie/:id/', { id: movie.id}));
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

// const mapDispatchToProps = (dispatch: any) => ({
//   getMovies: (searchParams: SearchParams, sortBy: string) => dispatch(loadMoviesStart(searchParams, sortBy)),
//   resetStore: () => dispatch(resetStore())
// });

export default connect(
  mapStateToProps
)(MoviesPage);
  