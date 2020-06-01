import * as React from 'react';
import * as css from './Logo.module.css';

const Logo: React.FunctionComponent = ():JSX.Element => {
  return (
    <div className={css.logo}>
      <span className='bold'>netflix</span><span>roulette</span>
    </div>
  );
};

export default Logo;