import axios from "axios";
import { urlLink } from "../config/config";

export const useResourceAdmin = async ({ doctype, filters }) => {
  try {
    let url = `${urlLink.url}/api/resource/${doctype}?fields=["*"]&limit_page_length=None`;

    if (filters) {
      url += `&filters=${encodeURIComponent(JSON.stringify(filters))}`;
    }

    const response = await axios.get(url, { withCredentials: true });
    return response.data?.data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
