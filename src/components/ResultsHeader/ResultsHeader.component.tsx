import * as React from 'react';
import { useState } from 'react';
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
  const [activeSwitcherId, setActiveSwitcherId] = 
    useState(sortSwitcherSettings.activeId);

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