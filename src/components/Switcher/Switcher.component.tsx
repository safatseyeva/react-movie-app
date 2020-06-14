import * as React from 'react';
import SwitchOption from './SwitchOption.component';

export interface SwitcherSettings {
  type: string,
  options: Array<string>,
  activeId: number
}

interface SwitcherProps {
  settings: SwitcherSettings;
  activeSwitcherId: number;
  onSwitherChange(id: number): void
}

class Switcher extends React.PureComponent<SwitcherProps> {
  handleSwitcherChange = (id: number): void => {
    if (id !== this.props.activeSwitcherId) {
      this.props.onSwitherChange(id);
    }
  };

  render(): React.ReactNode {
    const optionsComponents = this.props.settings.options.map(
      (option, index) => (
        <SwitchOption
          key={option}
          option={option}
          optionId={index}
          active={index === this.props.activeSwitcherId}
          handleSwitcherChange={this.handleSwitcherChange}
        />
      )
    );

    return (
      <div className='d-flex aline-items-center uppercase'>
        <div style={{marginRight: '20px'}}>{this.props.settings.type}</div>
        <div className='d-flex aline-items-center'>{optionsComponents}</div>
      </div>
    );
  }
}

export default Switcher;

