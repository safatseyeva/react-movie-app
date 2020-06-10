import * as React from 'react';

class ErrorBoundary extends React.Component {
  state = { 
    hasError: false
  };

  componentDidCatch(error: Error): void {
    this.setState({
      hasError: true
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
