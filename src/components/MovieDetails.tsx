import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { fetchMovieDetails } from "../store/movieDetailsSlice";

const IconCalendar = () => <span className="info-icon">📅</span>;
const IconClock = () => <span className="info-icon">⏳</span>;
const IconDirector = () => <span className="info-icon">🎬</span>;
const IconActors = () => <span className="info-icon">👥</span>;
const IconLanguage = () => <span className="info-icon">🌐</span>;
const IconAward = () => <span className="info-icon">🏆</span>;
const IconStar = () => <span className="info-icon">⭐</span>;

const MovieDetails: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { movie, loading } = useSelector(
    (state: RootState) => state.movieDetails
  );
 

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [dispatch, imdbID]);

  const handleGoBack = () => {
    navigate("/");
  };

  if (loading)
    return (
      <div className="loading-spinner">
        <p>Loading...</p>
      </div>
    );

  if (!movie) return <p className="no-results">No movie details found.</p>;

  return (
    <div className="movie-details">
      <button
        className="back-button"
        onClick={handleGoBack}
        aria-label="Go back to search page"
      >
        Back
      </button>

      <div className="movie-details-container">
        <div className="movie-poster-section">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="movie-poster-img"
          />
          <div className="quick-info">
            <div className="imdb-badge">
              <IconStar /> IMDb: {movie.imdbRating} ({movie.imdbVotes} votes)
            </div>
            <p>
              <IconClock /> {movie.Runtime}
            </p>
            <p>
              <IconCalendar /> {movie.Released}
            </p>
          </div>
        </div>

        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <p className="subtitle">
            {movie.Year} - {movie.Rated} - {movie.Genre}
          </p>

          <div className="info-section">
            <h3>Overview</h3>
            <div className="info-card">
              <p>
                <strong>Plot:</strong> {movie.Plot}
              </p>
            </div>
          </div>

          <div className="info-section">
            <h3>Crew & Cast</h3>
            <div className="info-card">
              <p>
                <IconDirector /> <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <IconActors /> <strong>Actors:</strong> {movie.Actors}
              </p>
            </div>
          </div>

          <div className="info-section">
            <h3>Details</h3>
            <div className="info-card">
              <p>
                <IconLanguage /> <strong>Language:</strong> {movie.Language}
              </p>
              <p>
                <IconLanguage /> <strong>Country:</strong> {movie.Country}
              </p>
              <p>
                <IconAward /> <strong>Awards:</strong> {movie.Awards}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
