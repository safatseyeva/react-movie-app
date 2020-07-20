import React from 'react';
import { storiesOf } from '@storybook/react';

import MovieCard from '../components/Movies/MovieCard.component';


const movie =  {
  id: 424785,
  title: 'Transformers 7',
  tagline: '',
  vote_average: 0,
  vote_count: 0,
  release_date: '2019-06-26',
  poster_path: 'https://image.tmdb.org/t/p/w500/432BowXw7a4fWXSONxBaFKqvW4f.jpg',
  overview: 'Plot unknown.',
  budget: 0,
  revenue: 0,
  genres: [
    'Science Fiction',
    'Action',
    'Adventure'
  ],
  runtime: null
};

storiesOf('MovieCard', module)
  .add('movie card', 
    () => <MovieCard item={movie}/>);
