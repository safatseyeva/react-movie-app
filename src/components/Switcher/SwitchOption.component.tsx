import * as React from 'react';
import * as css from './SwitchOption.module.css';

interface SwitchOptionProps {
  option: string;
  optionId: number;
  active: boolean;
  handleSwitcherChange(id: number): void
}

const SwitchOption: React.FunctionComponent<SwitchOptionProps> = (props: SwitchOptionProps): JSX.Element => {
  return (
    <button
      className={`${css.switchOption} uppercase ${
        props.active ? `${css.active}` : ''
      }`}
      onClick={() => props.handleSwitcherChange(props.optionId)}
    >
      {props.option}
    </button>
  );
};


export default SwitchOption;
