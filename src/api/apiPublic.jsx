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
                withCredentials: true
            }
        );    
        console.log(response.data);
        return response || []; 
    } catch (error) {
      throw error;
    }
};


export const getFees = async (filters) => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/Fees?fields=["*"]&filters=[["student", "=", "${filters}"]]`,
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

export const updateStudent = async (data, id) => {
   try{
    const token = sessionStorage.getItem("api_key");
    console.log(token);
    const response = await axios.put(
      `${urlLink.url}/api/resource/Student/${id}`,
      data,
      {
        headers: {
           Accept: "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
    return response.data?.data || [];
   }catch(error){
    throw error;
   }
} 