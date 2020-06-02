import * as React from 'react';
import { useState } from 'react';
import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';
import ResultsHeader from './components/ResultsHeader/ResultsHeader.component';
import MoviesList from './components/Movies/MoviesList.component';

export interface SearchParams {
  searchStr: string;
  searchType: string;
}

const MoviePage: React.FunctionComponent = ():JSX.Element => {
  const [resultsNumber, setResultsNumber] = useState(0);

  const onMoviesNumberChanged = (moviesNumber: number): void => {
    setResultsNumber(moviesNumber);
  };

  return (
    <div className='main d-flex flex-column'>
      <Header />
      Movie page
      {/* <section>
        <ResultsHeader resultsNumber={resultsNumber} onSort={onSort} />
        <MoviesList 
          searchParams={seachParams} 
          sortBy={sortBy}
          onMoviesNumberChanged={onMoviesNumberChanged} />
      </section> */}
      <Footer/>
    </div>
  );
};

export default MoviePage;
