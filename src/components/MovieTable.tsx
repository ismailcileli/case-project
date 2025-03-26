import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  return (
    <div className="movie-table-wrapper">
      <table className="movie-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Year</th>
            <th>Type</th>
            <th>IMDb ID</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="movie-poster"
                />
              </td>
              <td>
                <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
              </td>
              <td>{movie.Year}</td>
              <td>{movie.Type}</td>
              <td>{movie.imdbID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;