import { api } from "../config";

export default class MakeRequest {
  static async get(endpoint) {
    try {
      const { data } = await api.get(endpoint);
      return data;
    } catch (error) {
      console.log("Error: ", error.response.data.message);
      return {};
    }
  }
}
