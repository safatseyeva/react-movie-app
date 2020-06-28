import * as React from 'react';
import { render, screen } from './utils/testUtils';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import MoviesListMock from './components/Movies/MoviesList.mock';


describe('<App /> component:', () => {
  test('should render Movies page', () => {
    render(<App />, { initialState: {
      movies: {
        movies: MoviesListMock,
        activeMovie: undefined,
        loading: false,
        error: '',
        searchParams: {
          search: '',
          searchBy: ''
        },
        sortBy: '',
        filter: []
      }
    }});
    screen.getByText('Find your movie');
  });

  test('should render Movies Item page with Lion movie', () => {
    render(<App />, { initialState: {
      movies: {
        activeMovie: MoviesListMock[2]
      }
    }});
    expect(screen.getByTestId('movie-item-name')).toHaveTextContent('Shazam!');
  });
});
