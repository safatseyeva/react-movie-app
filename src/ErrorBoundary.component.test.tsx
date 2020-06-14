import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorBoundary from './ErrorBoundary.component';


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
