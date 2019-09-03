import { moviesEndpoint } from "../config.json";
import httpService from "./httpService";

export function getMovies() {
  return httpService.get(moviesEndpoint);
}

export function getMovie(id) {
  return httpService.get(`${moviesEndpoint}/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(`${moviesEndpoint}/${movie._id}`, body);
  }
  return httpService.post(moviesEndpoint, movie);
}

export function deleteMovie(id) {
  return httpService.delete(`${moviesEndpoint}/${id}`);
}
