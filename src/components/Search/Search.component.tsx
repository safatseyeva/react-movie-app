import * as React from 'react';
import { useState } from 'react';
import Switcher, { SwitcherSettings } from '../Switcher/Switcher.component';
import SearchForm from './SearchForm.component';
import * as css from './Search.module.css';
import { SearchParams } from '../MoviesPage/MoviesPage.component';

interface SearchProps {
  onSearch(searchObj: SearchParams): void;
}

const Search: React.FunctionComponent<SearchProps> = (props): JSX.Element => { 
  const switcherSettings: SwitcherSettings = {
    type: 'search by',
    options: ['title', 'genres'],
    activeId: 0
  };

  const [activeSwitcherId, setActiveSwitcherId] = 
    useState(switcherSettings.activeId);

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
      <h1 className='extra-light uppercase'>Find your movie</h1>
      <SearchForm onSubmitClick={onSubmitClick} />
      <Switcher 
        settings={switcherSettings}
        activeSwitcherId={activeSwitcherId}
        onSwitherChange={onSwitherChange} />
    </div>
  );
};

export default Search;
