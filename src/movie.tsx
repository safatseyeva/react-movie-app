import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MoviePage from './MoviePage';
import './styles.css';

const rootElement = document.getElementById('movie');
ReactDOM.render(<MoviePage />, rootElement);
