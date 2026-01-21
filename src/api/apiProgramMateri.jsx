
import axios from "axios";
import { urlLink } from "../config/config";

export const getProgramMateriById = async (doctype,id) => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/${doctype}/${id}?fields=["*"]`,
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

export const addFileToProgramMateri = async (doctype, id, newFile) => {
  try {
    const getResponse = await axios.get(
      `${urlLink.url}/api/resource/${doctype}/${id}`,
      { withCredentials: true }
    );

    if (!getResponse.data || !getResponse.data.data) {
      throw new Error("Data tidak ditemukan di API");
    }

    const oldData = getResponse.data.data;
    const oldFiles = Array.isArray(oldData.file) ? oldData.file : []; 

    const updatedFiles = [...oldFiles, newFile];

    const response = await axios.put(
      `${urlLink.url}/api/resource/${doctype}/${id}`,
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

export const removeFileProramMateri  = async (doctype, id, fileName) => {
  try {
    const getResponse = await axios.get(
      `${urlLink.url}/api/resource/${doctype}/${id}`,
      { withCredentials: true }
    );

    const oldData = getResponse.data?.data || {};
    const oldFiles = oldData.file || [];
    const updatedFiles = oldFiles.filter((fileItem) => fileItem.file !== fileName);
    const response = await axios.put(
      `${urlLink.url}/api/resource/Program%20Materi/${id}`,
      { ...oldData, file: updatedFiles },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
    return response.data?.data || [];
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus file", error?.response?.data || error.message);
    return [];
  }
}
export const updateFileToProgramMateri = async (doctype, id, newFile) => {
  try {
    // Ambil data lama
    const getResponse = await axios.get(
      `${urlLink.url}/api/resource/${encodeURIComponent(doctype)}/${id}`,
      { withCredentials: true }
    );

    const oldData = getResponse.data.data;
    const oldFiles = Array.isArray(oldData.file) ? oldData.file : [];

    const targetFile = newFile.oldFileName || newFile.file;

    const fileIndex = oldFiles.findIndex(
      (file) => String(file.file).trim() === String(targetFile).trim()
    );

    if (fileIndex === -1) {
      throw new Error("File yang akan diperbarui tidak ditemukan");
    }

    // Update file
    oldFiles[fileIndex] = {
      ...oldFiles[fileIndex],
      file: newFile.file ?? oldFiles[fileIndex].file,
      title: newFile.title ?? oldFiles[fileIndex].title,
      file_url: newFile.file_url ?? oldFiles[fileIndex].file_url,
      description: newFile.description ?? oldFiles[fileIndex].description,
    };

    // Gunakan doctype yang diberikan, jangan hardcode
    const response = await axios.put(
      `${urlLink.url}/api/resource/${encodeURIComponent(doctype)}/${id}`,
      { file: oldFiles },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    throw error; // jangan return [], lebih aman throw supaya hook bisa catch
  }
};



export const createFolderProgramMateri = async (folderName) => {
  try {
    const response = await axios.post(
      `${urlLink.url}/api/method/frappe.core.doctype.file.file.create_new_folder`,
    folderName,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data?.data || []; 
  } catch (error) {
    throw error;
  }
};

export const deleteFileProgramMateri = async (id, fileName) => {
  try {
    const response = await axios.delete(
      `${urlLink.url}/api/resource/File/${fileName}`,
      {
        withCredentials: true,
      }
    );

    console.log("File berhasil dihapus:", fileName);
    return response.data?.data || [];
  } catch (error) {
   throw error;
  }
};


export const checkFolderExists = async (folderName) => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/File/${folderName}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response.data);
    return !!response.data?.data; 
  } catch (error) { 
  
    return false; // Jika error, anggap folder tidak ada agar tetap bisa dibuat  
  }
};


export const uploadFileProgramMateri = async (file, folder = "") => {
  try {
    const formData = new FormData();

    // Deteksi apakah file adalah URL string atau file asli
    const isUrl = typeof file === "string" && file.startsWith("http");

    if (isUrl) {
      formData.append("file_url", file); // untuk upload via URL
    } else {
      formData.append("file", file); // untuk upload file asli
    }

    formData.append("folder", folder);
    formData.append("is_private", "0");

    // Debug
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await axios.post(
      `${urlLink.url}/api/method/upload_file`,
      formData,
      {
        headers: {
          "Accept": "application/json",
        },
        withCredentials: true, // penting kalau pakai login session
      }
    );

    if (!response.data) {
      throw new Error("Response dari server kosong.");
    }

    console.log("Parsed Response:", response.data);

    return response.data.message || "Upload berhasil!";
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};




export const getModulTrainingPublic = async (token) => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/Modul%20Training?fields=["*"]`,
      {
 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${token}`,
        },
      }
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Terjadi kesalahan", error?.response?.data || error.message);
    return [];
  }

}

export const getDetailModulTrainingPublic = async (id, token) => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/Modul%20Training/${id}`,
      {
 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${token}`,
        },
      }
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Terjadi kesalahan", error?.response?.data || error.message);
    return [];
  }

}


