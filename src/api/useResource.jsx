import { use } from "react";
import axios from "axios";
import { urlLink } from "../config/config";
export const  useResourceGet = (doctype) => {
    try{
        const token = sessionStorage.getItem("api_key");
        const response = axios.get(`${urlLink.url}/api/resource/${doctype}?fields=["*"]`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `token ${token}`,
          },
     });
     return response.data?.data || [];
    }catch(e){
        throw e;
    }
};