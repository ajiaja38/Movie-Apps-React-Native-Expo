import { apiKey } from ".";

export const API_ENDPOINT = {
  TRENDING: `trending/movie/day?api_key=${apiKey}`,
  UPCOMING: `movie/upcoming?api_key=${apiKey}`,
  TOP_RATED: `movie/top_rated?api_key=${apiKey}`,
};
