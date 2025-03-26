import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMovieDetails } from '../utils/api';
import { MovieDetails } from '../types';

interface MovieDetailsState {
  movie: MovieDetails | null;
  loading: boolean;
}

const initialState: MovieDetailsState = {
  movie: null,
  loading: false,
};

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (imdbID: string) => {
    const response = await getMovieDetails(imdbID);
    return response;
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default movieDetailsSlice.reducer;