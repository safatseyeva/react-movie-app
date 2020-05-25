import * as React from 'react';
import { ReactElement } from 'react';

export default function App(): ReactElement  {
  const headerElement = React.createElement(
    'h1',
    { className: 'greeting uppercase' },
    'Find your movie'
  );

  return (
    <div>{headerElement}</div>
  );
}