import axios from "axios";
import { urlLink } from "./config";
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