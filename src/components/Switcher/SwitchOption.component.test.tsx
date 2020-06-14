import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SwitchOption from './SwitchOption.component';

describe('<SwitchOption /> component:', () => {
  test('should render and match snapshot', () => {
    const handleSwitcherChange = jest.fn();
    const { asFragment } = 
      render(
        <SwitchOption 
          option='title'
          optionId={0}
          active={true}
          handleSwitcherChange={handleSwitcherChange}
        />
      );
    expect(asFragment()).toMatchSnapshot();
  });
});
