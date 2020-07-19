import * as React from 'react';

import { useRouter } from 'next/router';

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
}

export interface SearchParams {
  search: string;
  searchBy: string;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const router = useRouter();

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
    router.push(('/movie/' + movie.id));
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


export default MoviesPage;
  