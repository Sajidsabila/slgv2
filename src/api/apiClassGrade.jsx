import axios from "axios";

export const getClassGrading = async () => {


  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Class%20Grading?fields=["*"]`,
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
