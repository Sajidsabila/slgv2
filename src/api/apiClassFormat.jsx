import axios from "axios";
import { urlLink } from "./config";

export const getClassFormat = async () => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/Program%20Class%20Format?fields=["name", "abbr"]&limit_page_length=None`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data?.data || []; 

  } catch (error) {
    console.error("Terjadi kesalahan", error?.response?.data || error.message);
    return [];
  }
};