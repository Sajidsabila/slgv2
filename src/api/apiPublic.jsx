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

