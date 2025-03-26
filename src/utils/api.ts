import axios from 'axios';
import { MovieListResponse, MovieDetails } from '../types';

const API_KEY = 'cfc36afb';
const BASE_URL = 'http://www.omdbapi.com/';

export const getMovies = async (
  searchValue: string,
  year?: string,
  type?: string,
  page: number = 1
): Promise<MovieListResponse> => {
  const params: any = {
    s: searchValue,
    apikey: API_KEY,
    page,
  };
  if (year) params.y = year;
  if (type) params.type = type;

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  const response = await axios.get(BASE_URL, {
    params: { i: imdbID, apikey: API_KEY },
  });
  return response.data;
};