import { sortSwitcherSettings } from '../components/ResultsHeader/ResultsHeader.component';
import { SearchParams } from '../components/MoviesPage/MoviesPage.component';
import { Movie } from '../components/Movies/MoviesList.component';

type GenericObject = { 
	[key: string]: any;
};
  
export const search = (searchParams: SearchParams, moviesArr: Array<Movie>): Array<Movie> => {
  return moviesArr.filter((movie: GenericObject) => {
    const movieValue = searchParams && movie[searchParams.searchType].toLowerCase();
    return searchParams && movieValue.indexOf(searchParams.searchStr.toLowerCase()) > -1;
  });
}

export const filter = (activeMovieId: number, moviesArr: Array<Movie>): Array<Movie>  => {
	const genre = moviesArr
		.find((movie: Movie) => movie.id === activeMovieId)?.genre;

	return moviesArr
		.filter((movie: Movie) => movie.genre === genre && movie.id !== activeMovieId);
}

export const sort = (sortBy: string | undefined, moviesArr: Array<Movie>): Array<Movie>  => {
	const defaultSorting = sortSwitcherSettings.options[sortSwitcherSettings.activeId];
	const sorting = (!sortBy || sortBy === defaultSorting) ? 
		'year' : sortBy;

	return moviesArr.sort((a: GenericObject, b: GenericObject) => b[sorting] - a[sorting]);
}
