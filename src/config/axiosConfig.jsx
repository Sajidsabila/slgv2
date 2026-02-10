import axios from "axios";
import { urlLink } from "./config";

const axiosConfig = axios.create({
  baseURL: urlLink.url,
  withCredentials: true,
});

export default axiosConfig;
