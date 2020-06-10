import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Switcher, { SwitcherSettings } from './Switcher.component';

afterEach(cleanup);

describe('<Switcher /> component:', () => {
  test('should render with two buttons', () => {
    const switcherSettings: SwitcherSettings = {
      type: 'search by',
      options: ['title', 'genre'],
      activeId: 0
    };
    const onSwitherChange = jest.fn();
    const { getAllByRole, getByText } = 
      render(
        <Switcher
          settings={switcherSettings}
          activeSwitcherId={0}
          onSwitherChange={onSwitherChange}
        />
      );
    expect(getAllByRole('button').length).toBe(2);
    fireEvent.click(getByText('genre'));
    expect(onSwitherChange).toBeCalledWith(1);
  });
});
