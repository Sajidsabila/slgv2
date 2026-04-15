import axios from "axios";
import { urlLink } from "./config";

const axiosConfig = axios.create({
  baseURL: urlLink.url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔥 ambil token tiap request
axiosConfig.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `token ${token}`;
  }

  return config;
});

export default axiosConfig;