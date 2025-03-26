import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchMovies, setPage, setSearchValue, setYear, setType } from '../store/movieListSlice';
import MovieTable from './MovieTable';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading, currentPage, searchValue, year, type } = useSelector(
    (state: RootState) => state.movieList
  );

  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const [localYear, setLocalYear] = useState(year);
  const [localType, setLocalType] = useState(type);

  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalResults / moviesPerPage);

  useEffect(() => {
    dispatch(fetchMovies({ searchValue, year, type, page: currentPage }));
  }, [dispatch, searchValue, year, type, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchValue(localSearchValue));
    dispatch(setYear(localYear));
    dispatch(setType(localType));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>Movie Search</h1>
        <p>Explore movies, series, and episodes with me!</p>
      </header>

      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <span className="input-icon">🔎</span>
          <input
            type="text"
            value={localSearchValue}
            onChange={(e) => setLocalSearchValue(e.target.value)}
            placeholder="Search by title (e.g., Pokemon)"
          />
        </div>
        <div className="input-group">
          <span className="input-icon">🗓️</span>
          <input
            type="text"
            value={localYear}
            onChange={(e) => setLocalYear(e.target.value)}
            placeholder="Filter by year (e.g., 2020)"
            aria-label="Filter movies by year"
          />
        </div>
        <div className="input-group select-group">
          <span className="input-icon">🎬</span>
          <select
            value={localType}
            onChange={(e) => setLocalType(e.target.value)}
            aria-label="Filter movies by type"
            className="custom-select"
          >
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>
        <button type="submit">
          Search
        </button>
      </form>

      {loading && <div className="loading-spinner"><p>Loading...</p></div>} 
      {!loading && movies.length === 0 && <p className="no-results">No movies found.</p>}
      {!loading && movies.length > 0 && <MovieTable movies={movies} />}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;