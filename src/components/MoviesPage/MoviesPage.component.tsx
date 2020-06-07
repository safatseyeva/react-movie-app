import * as React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.component';
import Search from '../Search/Search.component';
import ResultsHeader from '../ResultsHeader/ResultsHeader.component';
import MoviesList, { Movie } from '../Movies/MoviesList.component';
import MoviesListMock from '../Movies/MoviesList.mock';
import { search, filter, sort } from '../../services/Movies.service';

interface MoviesPageProps {
  onMovieClick(movie: Movie, movies: Array<Movie>): void;
}

export interface SearchParams {
  searchStr: string;
  searchType: string;
}

interface FilterSettings {
  filterBy: string;
  activeMovie: Movie|undefined;
}
  
const MoviesPage: React.FunctionComponent<MoviesPageProps> = (props): JSX.Element => {
  const [searchParams, setSearchParams] = useState({
    searchStr: '',
    searchType: ''
  });
  const [sortBy, setSortBy] = useState('');
  const [moviesToShow, setMoviesToShow] = useState<Array<Movie>>([]);

  const generateMoviesToShow = (moviesList: Array<Movie>, filterSettings?: FilterSettings): Array<Movie> => {
    let moviesArr: Array<Movie> = [];
    moviesArr = [...moviesList];

    if (searchParams && searchParams.searchStr) {
      moviesArr = search(searchParams, moviesArr);
    }

    if (moviesArr.length) {
      moviesArr = filterSettings && filterSettings.filterBy && filterSettings.activeMovie ?
        filter(filterSettings.activeMovie.id, moviesArr) : moviesArr = sort(sortBy, moviesArr);
    }

    return moviesArr;
  };

  useEffect(() => {
    setMoviesToShow(generateMoviesToShow(MoviesListMock));
  }, [searchParams, sortBy]);

  const onSearch = (searchObj: SearchParams): void => {
    setSearchParams(searchObj);
  };

  const onSort = (sortType: string): void => {
    setSortBy(sortType);
  };

  const onMovieClick = (movie: Movie): void => {
    const filterSettings = {
      filterBy: 'genre', 
      activeMovie: movie
    };
    props.onMovieClick(movie, generateMoviesToShow(MoviesListMock, filterSettings));
  };

  return (
    <React.Fragment>
      <Header/>
      <section>
        <Search onSearch={onSearch} />
        <ResultsHeader resultsNumber={moviesToShow.length} onSort={onSort} />
        <MoviesList 
          moviesToShow={moviesToShow}
          onMovieClick={onMovieClick} />
      </section>
    </React.Fragment>
  );
};

export default MoviesPage;
  