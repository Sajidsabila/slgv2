import axios from "axios";
export const apiGetProgramMateriPublic = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SISTER_URL}/api/resource/Program%20Materi?fields=["*"]&order_by=creation desc`);    
        return response.data?.data || []; 
    } catch (error) {
        console.error("Terjadi kesalahan", error?.response?.data || error.message);
        return [];
    }
    
}