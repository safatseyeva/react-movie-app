import * as React from 'react';
import * as css from './Search.module.css';

interface SearchFormProps {
  onSubmitClick(value: string): void;
}

class SearchForm extends React.Component<SearchFormProps> {
  private isSubmitCalled = false;
  private input: React.RefObject<HTMLInputElement>;

  constructor(props: SearchFormProps) {  
    super(props);
    this.input = React.createRef<HTMLInputElement>();
  }

  handleSubmit = (event: React.SyntheticEvent<EventTarget>): void => {
    if (this.input.current && this.input.current.value !== '') {
      this.props.onSubmitClick(this.input.current.value);
      this.isSubmitCalled = true;
    }
    event.preventDefault();
  }

  handleBlur = (): void => {
    if (this.isSubmitCalled && this.input.current && !this.input.current.value) {
      this.props.onSubmitClick('');
      this.isSubmitCalled = false;
    }
  }

  render(): React.ReactNode {
    return(
      <form onSubmit={this.handleSubmit} className={`d-flex ${css.searchForm}`}>
        <input type='text' ref={this.input} className='extra-light' onBlur={this.handleBlur} />
        <button type='submit' className='uppercase'>Submit</button>
      </form>
    );
  }
}

export default SearchForm;