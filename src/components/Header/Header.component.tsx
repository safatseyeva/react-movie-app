import * as React from 'react';
import * as css from './Header.module.css';
import Logo from '../Logo/Logo.component';


const Header: React.FunctionComponent = (props):JSX.Element => {
  return (
    <header className={`d-flex justify-between ${css.header}`}>
      <Logo />
      {props.children}
    </header>
  );
};

export default Header;
