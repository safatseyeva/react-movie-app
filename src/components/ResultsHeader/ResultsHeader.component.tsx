import * as React from 'react';
import Switcher, { SwitcherSettings } from '../Switcher/Switcher.component';
import * as css from './ResultsHeader.module.css';

interface ResultsHeaderProps {
	resultsNumber: number;
	onSort(sortType: string): void;
}

export const sortSwitcherSettings: SwitcherSettings = {
  type: 'sort by',
  options: ['release date', 'rating'],
  activeId: 0
};

const ResultsHeader: React.FunctionComponent<ResultsHeaderProps> = (props): JSX.Element => {
  const onSwitherChange = (value: number) => {
    props.onSort(sortSwitcherSettings.options[value]);
  };
	
  return (
    <div className={`d-flex aline-items-center ${css.resultsHeader}`}>
      <div className={`bold ${css.resultsHeaderItem}`}>{props.resultsNumber} movie(s) found</div>
      <Switcher settings={sortSwitcherSettings} onSwitherChange={onSwitherChange} />
    </div>
  );
};

export default ResultsHeader;