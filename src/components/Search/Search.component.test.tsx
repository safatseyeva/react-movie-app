import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search.component';

afterEach(cleanup);

describe('<Search /> component:', () => {
  test('should render with search form and switcher options', () => {
    const onSearch = jest.fn();
    const { getByTestId, getByText } = 
      render(<Search onSearch={onSearch}/>);

    expect(getByTestId('search-form')).toBeDefined();
    expect(getByText('title').textContent).toBe('title');
    expect(getByText('genre').textContent).toBe('genre');
  });

  test('should handle search corectly with input value and after blur', () => {
    const onSearch = jest.fn();
    const { getByTestId, getByText } = 
      render(<Search onSearch={onSearch}/>);
    const form = getByTestId('search-form');
    const input = form.getElementsByTagName('input');

    expect(getByTestId('search-submit')).toBeDefined();
    fireEvent.change(input[0], { target: { value: 'Lion' } });
    fireEvent.click(getByText('Submit'));

    expect(onSearch).toBeCalledWith({
      searchStr: 'Lion',
      searchType: 'title'
    });

    fireEvent.blur(input[0], { target: { value: '' } });
    fireEvent.click(getByText('Submit'));

    expect(onSearch).toBeCalledWith({
      searchStr: '',
      searchType: 'title'
    });
  });

  test('should not call onSearch for empty input', () => {
    const onSearch = jest.fn();
    const { getByTestId, getByText } = 
      render(<Search onSearch={onSearch}/>);
    const form = getByTestId('search-form');
    const input = form.getElementsByTagName('input');

    fireEvent.change(input[0], { target: { value: '' } });
    fireEvent.click(getByText('Submit'));

    expect(onSearch).not.toBeCalled();
  });
});
  