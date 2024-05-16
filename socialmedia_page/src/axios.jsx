import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8803/api/",
  withCredentials: true,
});