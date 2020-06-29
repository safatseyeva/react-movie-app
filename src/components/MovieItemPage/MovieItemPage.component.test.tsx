import * as React from 'react';
import { render, screen } from '../../utils/testUtils';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import MovieItemPage from './MovieItemPage.component';
import MoviesListMock from '../Movies/MoviesList.mock';


describe('<MovieItemPage /> component:', () => {
  test('should render and show No Films Found and Back to search', () => {
    const state = {
      movies: {
        list: [],
        activeMovie: MoviesListMock[0]
      }
    };

    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieItemPage />
      </MemoryRouter>, { initialState: state }
    );
    
    screen.getByText('No Films Found');
    screen.getByText('Back to search');
  });

  test('should render Movie Item and Movie Card array correctly, switch movies', () => {
    const state = {
      movies: {
        list: MoviesListMock,
        activeMovie: MoviesListMock[0],
        loading: false,
        error: '',
        searchParams: {
          search: '',
          searchBy: ''
        },
        sortBy: '',
        filter: []
      }
    };
    
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <MovieItemPage />
      </MemoryRouter>, { initialState: state }
    );
    
    const moviesArr = screen.getAllByTestId(/movieId_/);
    expect(moviesArr.length).toBe(3);
    expect(screen.getByTestId('movie-item-name')).toHaveTextContent('Transformers 7');
  });
});
