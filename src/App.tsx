import * as React from 'react';
import { useState } from 'react';
import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';
import Search from './components/Search/Search.component';
import ResultsHeader from './components/ResultsHeader/ResultsHeader.component';
import MoviesList from './components/Movies/MoviesList.component';

export interface SearchParams {
  searchStr: string;
  searchType: string;
}

const App: React.FunctionComponent = ():JSX.Element => {
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
    <div className='main d-flex flex-column'>
      <Header />
      <section>
        <Search onSearch={onSearch} />
        <ResultsHeader resultsNumber={resultsNumber} onSort={onSort} />
        <MoviesList 
          searchParams={seachParams} 
          sortBy={sortBy}
          onMoviesNumberChanged={onMoviesNumberChanged} />
      </section>
      <Footer/>
    </div>
  );
};

export default App;
