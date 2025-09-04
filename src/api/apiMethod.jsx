import axios from "axios";
import { urlLink } from "../config/config";

export const methodPost = async ({ data, url }) => {
  try {
    const response = await axios.post(
      `${urlLink.url}/api/method/${url}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
   return  response.data?.message || [];
  } catch (error) {
    throw error;
  }
};


export const methodGet = async ({url}) => {
  try{
    const response = await axios.get(`${urlLink.url}/api/method/${url}`,{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data?.message || [];
  }catch(error){
    throw error;
  }
}
