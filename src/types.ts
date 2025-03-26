export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  
  export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
  }
  
  export interface MovieListResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
  }