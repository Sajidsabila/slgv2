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
  if (!file) {
      console.error("⚠️ Tidak ada file yang dipilih");
      return { error: "File tidak ditemukan" };
  }

  try {
      // Ambil API Key & Secret dari LocalStorage (sesuai sistem kamu)
      const api_key = localStorage.getItem("api_key");
      const api_secret = localStorage.getItem("api_secret");

      // Buat FormData untuk upload file
      const formData = new FormData();
      formData.append("file", file, file); // Sama seperti Laravel attach()
      formData.append("folder", folder);
      formData.append("is_private", "0");

      for (let pair of formData.entries()) {
        console.log(`📦 FormData: ${pair[0]}`, pair[1]);
    }
    

      // Kirim POST request menggunakan Axios
      const response = await axios.post(
          `${import.meta.env.VITE_SISTER_URL}/api/method/upload_file`,
          "file_url" + encodeURIComponent(file) + "&folder=" + encodeURIComponent(folder),
          {
              headers: {
                  "Authorization": `token ${api_key}:${api_secret}`,
                  "Accept": "application/json",
              },
          }
      );

      console.log("✅ Upload sukses:", response.data);
      return response.data;
  } catch (error) {
      console.error("❌ Kesalahan:", error.response?.data || error.message);
      return { error: "Terjadi kesalahan dalam fetch" };
  }
};