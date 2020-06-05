import * as React from 'react';
import { useState } from 'react';
import Header from '../Header/Header.component';
import Search from '../Search/Search.component';
import ResultsHeader from '../ResultsHeader/ResultsHeader.component';
import MoviesList, { Movie } from '../Movies/MoviesList.component';

interface MoviesPageProps {
  onMovieClick(movie: Movie): void;
}

export interface SearchParams {
  searchStr: string;
  searchType: string;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const [seachParams, setSearchParams] = useState({
    searchStr: '',
    searchType: ''
  });
  const [sortBy, setSortBy] = useState('');
  const [resultsNumber, setResultsNumber] = useState(0);

  const onSearch = (searchObj: SearchParams): void => {
    setSearchParams(searchObj);
  };

  const onSort = (sortType: string): void => {
    setSortBy(sortType);
  };

  const onMoviesNumberChanged = (moviesNumber: number): void => {
    setResultsNumber(moviesNumber);
  };

  return (
    <React.Fragment>
      <Header />
      <section>
        <Search onSearch={onSearch} />
        <ResultsHeader resultsNumber={resultsNumber} onSort={onSort} />
        <MoviesList 
          searchParams={seachParams} 
          sortBy={sortBy}
          onMoviesNumberChanged={onMoviesNumberChanged}
          onMovieClick={props.onMovieClick} />
      </section>
    </React.Fragment>
  );
};

export default MoviesPage;
  