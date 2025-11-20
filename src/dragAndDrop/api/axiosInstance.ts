import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001", // your json-server URL
});