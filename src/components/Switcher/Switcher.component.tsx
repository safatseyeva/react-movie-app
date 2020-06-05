import * as React from 'react';
import SwitchOption from './SwitchOption.component';

export interface SwitcherSettings {
  type: string,
  options: Array<string>,
  activeId: number
}

interface SwitcherProps {
  settings: SwitcherSettings;
  onSwitherChange(id: number): void
}

interface SwitcherState {
  activeId: number | null
}

class Switcher extends React.PureComponent<SwitcherProps, SwitcherState> {
  constructor(props: SwitcherProps) {
    super(props);
    this.state = {
      activeId: null
    };
  }

  componentDidMount(): void {
    this.setState({ activeId: this.props.settings.activeId });
  }

  handleSwitcherChange = (id: number): void => {
    if (id !== this.state.activeId) {
      this.setState({ activeId: id });
      this.props.onSwitherChange(id);
    }
  };

  render(): React.ReactNode {
    const optionsComponents = this.props.settings.options.map(
      (option, index) => (
        <SwitchOption
          key={index}
          option={option}
          optionId={index}
          active={index === this.state.activeId ? true : false}
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

