import axios from "axios";
import { urlLink } from "../config/config";
export const apiGetProgramMateriPublic = async () => {
    try {
        const response = await axios.get(`${urlLink.url}/api/resource/Program%20Materi?fields=["*"]&order_by=creation desc`);    
        return response.data?.data || []; 
    } catch (error) {
       throw error;
    }
    
};

export const  apiGetProgramMateriPublicById = async (id) => {
    try {
        const response = await axios.get(`${urlLink.url}/api/resource/Program%20Materi/${id}?fields=["*"]`);    
        return response.data?.data || []; 
    } catch (error) {
      throw error;
    }
};

export const checkStudent = async(data) => {
    try {
        const response = await axios.post(`${urlLink.url}/api/method/erpnext.education.doctype.student.student.login_auth`,
            data,
            {
               headers:  {
                    "Content-Type": "application/json",
                },
            }
        );    
        console.log(response.data);
        return response.data || []; 
    } catch (error) {
      throw error;
    }
};

export const getPointStudent = async (filters) => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/Point%20Reward?fields=["point"]&filters=[["student", "=", "${filters}"]]`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `bearer ${import.meta.env.VITE_API_SECRET}`,
        },
      }
    );
    return response.data?.data || [];
  } catch (error) {
    throw error;
  }
};

