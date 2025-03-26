import { configureStore } from '@reduxjs/toolkit';
import movieListReducer from './movieListSlice';
import movieDetailsReducer from './movieDetailsSlice';

export const store = configureStore({
  reducer: {
    movieList: movieListReducer,
    movieDetails: movieDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;