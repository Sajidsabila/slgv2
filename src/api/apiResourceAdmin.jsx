import axios from "axios";
import { urlLink } from "../config/config";

export const apiResourceAdmin = async ({ doctype, filters }) => {
  try {
    let url = `${urlLink.url}/api/resource/${doctype}?fields=["*"]&limit_page_length=None`;
    if (filters) {
      url += `&filters=${encodeURIComponent(JSON.stringify(filters))}`;
    }

    const response = await axios.get(url, { withCredentials: true });
    return response.data?.data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiResourceAdminDetail = async ({ doctype, id }) => {
  try{
    const response = await axios.get(`${urlLink.url}/api/resource/${doctype}/${id}`,
      { withCredentials: true }
    );
    return response.data?.data || [];
  }catch(error){
    return error;
  }
};

export const apiResourceAdminDelete  = async({doctype, id}) => {
    try{
        const response = await axios.delete(`${urlLink.url}/api/resource/${doctype}/${id}`, {
            withCredentials: true
        });    
        return response.data?.data || []; 
    }catch(error){
        return error;
    }
}

export const apiResourceAdminUpdate = async({doctype, id, data}) => {
    try{
        const response = await axios.put(`${urlLink.url}/api/resource/${doctype}/${id}`, data, {
            withCredentials: true
        });    
        return response.data?.data || []; 
    }catch(error){
        return error;
    }
}

export const apiResourceAdminPost = async ({doctype, data}) => {
    try{
        const response = await axios.post(`${urlLink.url}/api/resource/${doctype}`, data, {
            withCredentials: true
        });    
        return response.data?.data || []; 
    }catch(error){
       return error;
    }
}

export const apiResourceAdminPut = async ({doctype, id, data}) => {
    try{
        const response = await axios.put(`${urlLink.url}/api/resource/${doctype}/${id}`, data, {
            withCredentials: true
        });    
        return response.data?.data || []; 
    }catch(error){
       return error
    }
}