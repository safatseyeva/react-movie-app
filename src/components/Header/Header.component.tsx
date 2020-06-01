import * as React from 'react';
import * as css from './Header.module.css';
import Logo from '../Logo/Logo.component';

const Footer: React.FunctionComponent = ():JSX.Element => {
  return (
    <header className={css.header}>
      <Logo />
    </header>
  );
};

export default Footer;