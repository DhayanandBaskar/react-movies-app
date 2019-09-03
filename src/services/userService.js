import { userEndpoint } from "../config.json";
import httpService from "./httpService";

export function register(user) {
  return httpService.post(userEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
