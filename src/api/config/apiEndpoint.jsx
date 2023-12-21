import { apiKey } from ".";

export const API_ENDPOINT = {
  // movie
  TRENDING: `trending/movie/day?api_key=${apiKey}`,
  UPCOMING: `movie/upcoming?api_key=${apiKey}`,
  TOP_RATED: `movie/top_rated?api_key=${apiKey}`,
  DETAIL_MOVIE: (id) => `movie/${id}?api_key=${apiKey}`,
  CREDITS_MOVIE: (id) => `movie/${id}/credits?api_key=${apiKey}`,
  SIMILAR_MOVIES: (id) => `movie/${id}/similar?api_key=${apiKey}`,
  SEARCH_MOVIES: (query) => `search/movie?api_key=${apiKey}&query=${query}`,

  // person
  DETAIL_PERSON: (id) => `person/${id}?api_key=${apiKey}`,
  CREDITS_PERSON: (id) => `person/${id}/movie_credits?api_key=${apiKey}`,
};
