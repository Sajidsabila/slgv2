// driveApi.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;

export const googledriveApi = async (fileId) => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        params: {
          fields: "id,name,mimeType,fileExtension",
          key: API_KEY,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching file:", err);
    throw err;
  }
};
