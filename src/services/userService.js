import { endpoint } from "../config.json";
import httpService from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return httpService.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
