import { API_ENDPOINT } from "../config/apiEndpoint";
import MakeRequest from "./Request";

const { DETAIL_PERSON, CREDITS_PERSON } = API_ENDPOINT;

export default class PersonAPI {
  static async getDetailPerson(id) {
    return await MakeRequest.get(DETAIL_PERSON(id));
  }

  static async getCreditsPerson(id) {
    return await MakeRequest.get(CREDITS_PERSON(id));
  }
}
