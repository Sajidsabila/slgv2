import axios from "axios";

export const getProgramMateri = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi?fields=["*"]&order_by=creation desc`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("is_private", "0");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Debug apakah FormData berisi file
    }
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
export const postProgramMateri = async (data) => {
  try {
  
    const response = await axios.post(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)

    return response.data?.data || [];
  } catch (error) {
    console.error("Terjadi kesalahan", error?.response?.data || error.message);
    return [];
  }
};


export const deleteProgramMateri = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi/${id}`,
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

export const updateProgramMateri = async (id, data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi/${id}`,
      data,
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

export const getProgramMateriById = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi/${id}?fields=["*"]`,
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

export const addFileToProgramMateri = async (id, newFile) => {
  try {
    const getResponse = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi/${id}`,
      { withCredentials: true }
    );

    if (!getResponse.data || !getResponse.data.data) {
      throw new Error("Data tidak ditemukan di API");
    }

    const oldData = getResponse.data.data;
    const oldFiles = Array.isArray(oldData.file) ? oldData.file : []; 

    const updatedFiles = [...oldFiles, newFile];

    const response = await axios.put(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi/${id}`,
      { 
        file: updatedFiles
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !response.data.data) {
      throw new Error("Gagal memperbarui file di API");
    }

    console.log("File berhasil ditambahkan:", response.data.data);
    return response.data.data;

  } catch (error) {
    console.error("Terjadi kesalahan:", error?.response?.data || error.message);
    return [];
  }
};

export const removeFileProramMateri = async (id, fileName) => {
  try {
    // Ambil data terbaru dari server
    const getResponse = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi/${id}`,
      { withCredentials: true }
    );

    const oldData = getResponse.data?.data || {};
    const oldFiles = oldData.file || [];

    // Filter hanya file yang akan dihapus
    const updatedFiles = oldFiles.filter((fileItem) => fileItem.file !== fileName);

    // Kirim data yang sudah diupdate ke server
    const response = await axios.put(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi/${id}`,
      { ...oldData, file: updatedFiles },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("File berhasil dihapus:", fileName);
    return response.data?.data || [];
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus file", error?.response?.data || error.message);
    return [];
  }
}



