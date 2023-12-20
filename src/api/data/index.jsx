import { api } from "../config";
import { API_ENDPOINT } from "../config/apiEndpoint";

const { TRENDING, UPCOMING, TOP_RATED } = API_ENDPOINT;

export default class MovieAPI {
  static async getTrendingMovies() {
    try {
      const { data } = await api.get(TRENDING);
      return data;
    } catch (error) {
      console.log("Error: ", error.response.data.message);
      return {};
    }
  }

  static async getUpcomingMovies() {
    try {
      const { data } = await api.get(UPCOMING);
      return data;
    } catch (error) {
      console.log("Error: ", error.response.data.message);
      return {};
    }
  }

  static async getTopRatedMovies() {
    try {
      const { data } = await api.get(TOP_RATED);
      return data;
    } catch (error) {
      console.log("Error: ", error.response.data.message);
      return {};
    }
  }
}
