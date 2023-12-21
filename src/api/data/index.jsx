import { API_ENDPOINT } from "../config/apiEndpoint";
import MakeRequest from "./Request";

const {
  TRENDING,
  UPCOMING,
  TOP_RATED,
  DETAIL_MOVIE,
  CREDITS_MOVIE,
  SIMILAR_MOVIES,
} = API_ENDPOINT;

export default class MovieAPI {
  static async getTrendingMovies() {
    return await MakeRequest.get(TRENDING);
  }

  static async getUpcomingMovies() {
    return await MakeRequest.get(UPCOMING);
  }

  static async getTopRatedMovies() {
    return await MakeRequest.get(TOP_RATED);
  }

  static async getDetailMovie(id) {
    return await MakeRequest.get(DETAIL_MOVIE(id));
  }

  static async getCreditsMovie(id) {
    return await MakeRequest.get(CREDITS_MOVIE(id));
  }

  static async getSimilarMovies(id) {
    return await MakeRequest.get(SIMILAR_MOVIES(id));
  }
}
