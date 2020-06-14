import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import ErrorBoundary from './ErrorBoundary.component';
import './styles.css';

const rootElement = document.getElementById('root');
ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, rootElement);
