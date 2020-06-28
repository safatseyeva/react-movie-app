import { AxiosResponse } from 'axios';
import axiosConfig from '../utils/api';

import { SearchParams } from '../components/MoviesPage/MoviesPage.component';


export async function getMovies(searchParams: SearchParams, sortBy: string, filter?: Array<string>): Promise<AxiosResponse> {
  let url = '/movies?limit=15';

  if (sortBy) {
    url = url + `&sortBy=${sortBy}`;
  }

  if (searchParams.search && searchParams.searchBy) {
    url = url + `&search=${searchParams.search}&searchBy=${searchParams.searchBy}`;
  }

  if (filter) {
    url = url + `&filter=${filter}`;
  }
 
  return await axiosConfig.get(url); 
}

export async function getMovieItem(id: number): Promise<AxiosResponse> {
  return await axiosConfig.get(`/movies/${id}`); 
}
