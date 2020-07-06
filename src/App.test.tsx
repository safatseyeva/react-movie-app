import * as React from 'react';
import { render, screen } from './utils/testUtils';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import App from './App';


describe('<App /> component:', () => {
  test('should render Movies page by default', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    screen.getByText('Find your movie');
  });


  test('should render Movies page on search', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );
    screen.getByText('Find your movie');
  });

});
