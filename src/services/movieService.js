import {} from "../config.json";
import httpService from "./httpService";

const apiEndpoint = "/movies";

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function getMovie(id) {
  return httpService.get(`${apiEndpoint}/${id}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(`${apiEndpoint}/${movie._id}`, body);
  }
  return httpService.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
  return httpService.delete(`${apiEndpoint}/${id}`);
}
