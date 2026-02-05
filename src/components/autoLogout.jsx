import axios from "axios";
import { urlLink } from "../config/config";

const autoLogout = async () => {
  try {
    await axios.get(`${urlLink.url}/api/method/logout`, { withCredentials: true });
  } catch (error) {
    console.error("Logout gagal:", error);
  } finally {
    sessionStorage.clear();
  }
};

export default autoLogout;
