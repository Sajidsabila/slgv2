import axios from "axios";

export const getProgramMateri = async () => {
  const api_key = localStorage.getItem("api_key");
  const api_secret = localStorage.getItem("api_secret");

  if (!api_key || !api_secret) {
    console.error("API Key atau Secret tidak ditemukan di localStorage");
    return [];
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi?fields=["*"]`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${api_key}:${api_secret}`,
        },
      }
    );
    console.log(response.data);
    return response.data?.data || []; 

  } catch (error) {
    console.error("Terjadi kesalahan", error?.response?.data || error.message);
    return [];
  }
};


export const uploadFileProgramMateri = async (file, folder = "Home") => {
  try {
    const apiKey = JSON.parse(localStorage.getItem("api_key"))?.value;
    const apiSecret = JSON.parse(localStorage.getItem("api_secret"))?.value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("is_private", "0");
    const response = await axios.post(
      `${import.meta.env.VITE_SISTER_URL}/api/method/upload_file`,
      formData,
      {
        headers: {
          "Accept": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);

    if (!response.data) {
      throw new Error("Response dari server kosong.");
    }

    console.log("Parsed Response:", response.data);

    return response.data.message || "Upload berhasil!";
  } catch (error) {
    console.error("Error upload file:", error.response?.data || error.message);
    throw error;
  }
};







