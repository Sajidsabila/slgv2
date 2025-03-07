import axios from "axios";

export const getClassFormat = async () => {
  const api_key = localStorage.getItem("api_key");
  const api_secret = localStorage.getItem("api_secret");

  if (!api_key || !api_secret) {
    console.error("API Key atau Secret tidak ditemukan di localStorage");
    return [];
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Class%20Format`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${api_key}:${api_secret}`,
        },
      }
    );
    return response.data?.data || []; 

  } catch (error) {
    console.error("Terjadi kesalahan", error?.response?.data || error.message);
    return [];
  }
};
