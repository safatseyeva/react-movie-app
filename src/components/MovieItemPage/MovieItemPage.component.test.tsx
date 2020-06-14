import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MovieItemPage from './MovieItemPage.component';
import MoviesListMock from '../Movies/MoviesList.mock';


jest.mock('../../images/movie_temp.png');

afterEach(cleanup);

const movie = MoviesListMock[0];
const moviesList = [...MoviesListMock].filter(item => item.id !== movie.id && item.genre === movie.genre);

describe('<MovieItemPage /> component:', () => {
  test('should render and call onBackToSearchClicked', () => {
    const onBackToSearchClicked = jest.fn();
    const { getByText } = 
      render(
        <MovieItemPage 
          movie={movie} 
          moviesToShow={moviesList} 
          onBackToSearchClicked={onBackToSearchClicked} />
      );
    fireEvent.click(getByText('Back to search'));
    expect(onBackToSearchClicked).toBeCalled();
  });

  test('should render Movie Item and Movie Card array correctly, switch movies', () => {
    const onBackToSearchClicked = jest.fn();
    const { getByTestId, getAllByTestId } = render(
      <MovieItemPage 
        movie={movie} 
        moviesToShow={moviesList} 
        onBackToSearchClicked={onBackToSearchClicked} />
    );
    const moviesArr = getAllByTestId(/movieId_/);
    expect(getByTestId('movie-item-name')).toHaveTextContent('Green Book');
    expect(moviesArr.length).toBe(1);
    expect(moviesArr[0]).toHaveTextContent('Coco');

    fireEvent.click(moviesArr[0]);
    expect(getByTestId('movie-item-name')).toHaveTextContent('Coco');
    expect(getAllByTestId(/movieId_/)[0]).toHaveTextContent('Green Book');
  });

  test('should show No Films Found', () => {
    const onBackToSearchClicked = jest.fn();
    const { getByText } = render(
      <MovieItemPage 
        movie={movie} 
        moviesToShow={[]} 
        onBackToSearchClicked={onBackToSearchClicked} />
    );
  
    getByText('No Films Found');
  });
});
