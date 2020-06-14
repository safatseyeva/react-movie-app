import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

jest.mock('../../images/movie_temp.png');

afterEach(cleanup);

describe('<App /> component:', () => {
  test('should render Movies page', () => {
    const { getAllByTestId, getByText } = 
      render(
        <App />
      );
    expect(getAllByTestId(/movieId_/).length).toBe(4);
    getByText('Find your movie');
  });

  test('should render Movies Item page with Lion movie', () => {
    const { getByTestId} = 
      render(
        <App />
      );
    fireEvent.click(getByTestId('movieId_3'));
    expect(getByTestId('movie-item-name')).toHaveTextContent('Lion');
  });
});
