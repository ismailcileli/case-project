import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../utils/api';
import { MovieListResponse } from '../types';

interface MovieListState {
  movies: MovieListResponse['Search'];
  totalResults: number;
  loading: boolean;
  currentPage: number;
  searchValue: string;
  year: string;
  type: string;
}

const initialState: MovieListState = {
  movies: [],
  totalResults: 0,
  loading: false,
  currentPage: 1,
  searchValue: 'Pokemon',
  year: '',
  type: '',
};

export const fetchMovies = createAsyncThunk(
  'movieList/fetchMovies',
  async ({ searchValue, year, type, page }: { searchValue: string; year: string; type: string; page: number }) => {
    const response = await getMovies(searchValue, year, type, page);
    return response;
  }
);

const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      state.currentPage = 1;
    },
    setYear: (state, action) => {
      state.year = action.payload;
      state.currentPage = 1;
    },
    setType: (state, action) => {
      state.type = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPage, setSearchValue, setYear, setType } = movieListSlice.actions;
export default movieListSlice.reducer;