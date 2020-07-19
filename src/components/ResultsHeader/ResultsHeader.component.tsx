import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Switcher, { SwitcherSettings } from '../Switcher/Switcher.component';
import * as css from './ResultsHeader.module.css';

interface ResultsHeaderProps {
	resultsNumber: number;
	onSort(sortType: string): void;
}

export const sortSwitcherSettings: SwitcherSettings = {
  type: 'sort by',
  options: ['release date', 'rating'],
  fields: ['release_date', 'vote_average'],
  activeId: 0
};

const ResultsHeader: React.FunctionComponent<ResultsHeaderProps> = (props): JSX.Element => {
  const router = useRouter();

  const [activeSwitcherId, setActiveSwitcherId] = 
    useState(sortSwitcherSettings.activeId);

  useEffect(() => {
    if (router.pathname === '/search') {
      const { sortBy } = router.query;

      if (sortBy) {
        const index = sortSwitcherSettings.fields?.indexOf(sortBy.toString()) || sortSwitcherSettings.activeId;
        setActiveSwitcherId(index);
      }
    }
  
  }, []);

  const onSwitherChange = (value: number) => {
    setActiveSwitcherId(value);
    if (sortSwitcherSettings.fields) {
      props.onSort(sortSwitcherSettings.fields[value]);
    }
  };
  
  
  return (
    <div className={`d-flex aline-items-center ${css.resultsHeader}`}>
      <div className={`bold ${css.resultsHeaderItem}`} data-cy='results-number'>{props.resultsNumber} movie(s) found</div>
      <Switcher 
        settings={sortSwitcherSettings}
        activeSwitcherId={activeSwitcherId} 
        onSwitherChange={onSwitherChange} />
    </div>
  );
};

export default ResultsHeader;