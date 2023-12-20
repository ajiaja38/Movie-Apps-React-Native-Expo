import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const apiKey = "b5e52d55287b6f516c247b109ab351c9";
