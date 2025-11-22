import axios from "axios";
import { urlLink } from "../config/config";

import { data, Navigate, useNavigate } from "react-router-dom";
import { use } from "react";



export const authStudent  = async (data) => {
  try {
    const response = await axios.post(
      `${urlLink.url}/api/method/smi.helper.login_auth`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
   return  response.data || [];
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (data) => {
   try {
    const response = await axios.post(
      `${urlLink.url}/api/method/frappe.core.doctype.user.user.update_password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
   return  response.data || [];
  } catch (error) {
    throw error;
  }
};



export const methodGet = async (doctype, filters = {}, fields = ["*"]) => {
  try {
    const filterParam = encodeURIComponent(JSON.stringify(filters));
    const fieldParam = encodeURIComponent(JSON.stringify(fields));

    const response = await axios.get(
      `${urlLink.url}/api/resource/${doctype}?fields=${fieldParam}&filters=${filterParam}`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const method = async (url) => {
  // const token = sessionStorage.getItem("token");
  try{
    const response = await axios.get(`${urlLink.url}/api/method/${url}`,{
      headers: {
        "Accept": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
       withCredentials: true,
    });
    return response.data
  }catch(error){
    throw error;
  }
}
export const methodLogout = async () => {
   const token = sessionStorage.getItem("token");
    const refresh_token = sessionStorage.getItem("refresh_token");
    if (!refresh_token && !token) return null;
      try{
        const response = await axios.post(`${urlLink.url}/api/method/smi.helper.logout`, {refresh_token : refresh_token}, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
        });

      }catch(error){
        sessionStorage.clear();

      }finally{
      sessionStorage.clear();

      }
}

export const refreshAccesToken = async () => {

    const token = sessionStorage.getItem("token");
    const refresh_token = sessionStorage.getItem("refresh_token");
    if (!refresh_token && !token) return null;
        try {
          const response = await axios.post(
            `${urlLink.url}/api/method/smi.helper.refresh_access_token`,
            { refresh_token },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const newToken = response.data?.access_token;
          if (newToken && newToken !== token) {
            sessionStorage.setItem("token", newToken);
            return newToken;
          }
          return token; 
        } catch (error) {
         sessionStorage.clear();

        }
};

export const  detailData = async ({doctype, id}) => {
 try{
    const response = await axios.get(
      `${urlLink.url}/api/resource/${doctype}/${id}?fields=["*"]`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
 }







