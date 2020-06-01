import * as React from 'react';
import { useState } from 'react';
import Switcher, { SwitcherSettings } from '../Switcher/Switcher.component';
import SearchForm from './SearchForm.component';
import * as css from './Search.module.css';
import { SearchParams } from '../../App';

interface SearchProps {
  onSearch(searchObj: SearchParams): void;
}

const Search: React.FunctionComponent<SearchProps> = (props): JSX.Element => { 
  const switcherSettings: SwitcherSettings = {
    type: 'search by',
    options: ['title', 'genre'],
    activeId: 0
  };
  const [activeSwitcherOption, setActiveSwitcherOption] = 
    useState(switcherSettings.options[switcherSettings.activeId]);

  const onSwitherChange = (value: number) => {
    setActiveSwitcherOption(switcherSettings.options[value]);
  };

  const onSubmitClick = (value: string): void => {
    props.onSearch({
      searchStr: value,
      searchType: activeSwitcherOption
    });
  };

  return (
    <div className={css.search}>
      <h1 className='extra-light uppercase'>Find your movie</h1>
      <SearchForm onSubmitClick={onSubmitClick} />
      <Switcher settings={switcherSettings} onSwitherChange={onSwitherChange} />
    </div>
  );
};

export default Search;
