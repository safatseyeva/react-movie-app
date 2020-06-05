import * as React from 'react';
import * as css from './Footer.module.css';
import Logo from '../Logo/Logo.component';

const Footer: React.FunctionComponent = (): JSX.Element => {
  return (
    <footer className={css.footer}>
      <div style={{marginTop: '22px'}}>
        <Logo />
      </div>
    </footer>
  );
};

export default Footer;