import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorBoundary from './ErrorBoundary.component';

afterEach(cleanup);

describe('<ErrorBoundary /> component:', () => {
  test('should render ', () => {
    const Throws = () => {
      throw new Error('error');
    };

    const { getByText, unmount } = 
      render(
        <ErrorBoundary>
          <Throws/>
        </ErrorBoundary>
      );
    getByText('Something went wrong.');
    unmount();
  });

});
