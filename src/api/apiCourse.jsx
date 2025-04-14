import axios from "axios";

export const getCourse = async () => {

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Course?fields=["name", "abbr"]`,
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