import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';

import Switcher, { SwitcherSettings } from '../Switcher/Switcher.component';
import SearchForm from './SearchForm.component';
import * as css from './Search.module.css';
import { SearchParams } from '../../components/MoviesPage/MoviesPage.component';

interface SearchProps {
  onSearch(searchObj: SearchParams): void;
}

const Search: React.FunctionComponent<SearchProps> = (props): JSX.Element => { 
  const router = useRouter();

  const switcherSettings: SwitcherSettings = {
    type: 'search by',
    options: ['title', 'genres'],
    activeId: 0
  };

  const [activeSwitcherId, setActiveSwitcherId] = 
    useState(switcherSettings.activeId);

  useEffect(() => {
    if (router.pathname === '/search') {
      const { searchBy } = router.query;

      if (searchBy) {
        const index = switcherSettings.options.indexOf(searchBy.toString());
        setActiveSwitcherId(index);
      }
    }
  
  }, []);

  const onSwitherChange = (value: number) => {
    setActiveSwitcherId(value);
  };

  const onSubmitClick = (value: string): void => {
    props.onSearch({
      search: value,
      searchBy: switcherSettings.options[activeSwitcherId]
    });
  };

  return (
    <div className={css.search}>
      <h1 className='extra-light uppercase h1'>Find your movie</h1>
      <SearchForm onSubmitClick={onSubmitClick} />
      <Switcher 
        settings={switcherSettings}
        activeSwitcherId={activeSwitcherId}
        onSwitherChange={onSwitherChange} />
    </div>
  );
};

export default Search;
