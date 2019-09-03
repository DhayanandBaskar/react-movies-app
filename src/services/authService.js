import jwtDecode from "jwt-decode";
import { loginEndpoint } from "../config.json";
import httpService from "./httpService";

const tokenKey = "token";

httpService.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await httpService.post(loginEndpoint, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function isAdmin() {
  return getCurrentUser() ? getCurrentUser().isAdmin : false;
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  isAdmin
};
