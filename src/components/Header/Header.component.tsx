import * as React from 'react';
import * as css from './Header.module.css';
import Logo from '../Logo/Logo.component';


interface HeaderProps {
  isBackToSearch?: boolean;
  onBackToSearchClicked?(): void
}

const Header: React.FunctionComponent<HeaderProps> = (props):JSX.Element => {
  return (
    <header className={`d-flex justify-between ${css.header}`}>
      <Logo />
      {props.isBackToSearch && 
        <div onClick={props.onBackToSearchClicked}
          style={{color:'#F65261'}}
          className='cursor-pointer bold'>
          Back to search
        </div>
      }
    </header>
  );
};

export default Header;