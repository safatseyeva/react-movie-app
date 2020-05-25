import * as React from 'react';


export default function App() {
  const headerElement = React.createElement(
    'h1',
    { className: 'greeting uppercase' },
    'Find your movie'
  );

  return (
    <div>{headerElement}</div>
  );
}