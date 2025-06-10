import axios from "axios";
import { urlLink } from "./config";

export const getIssueTypeList = async () => {
    try {
      const response = await axios.get(
        `${urlLink.url}/api/resource/Issue%20Type?fields=["*"]`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data?.data || []; 
 
    } catch (error) {
      console.error("Terjadi kesalahan", error?.response?.data || error.message);
      return [];
    }
  };
export const postIssue = async (data) => {
    try {
      const response = await axios.post(
        `${urlLink.url}/api/resource/Issue`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data || []; 
  
    } catch (error) {
    throw error;
    }
  };

  export const apiSendWa = async (number = "", body = {}) => {
    try {
      const wabody = {
        receiver: number.replace(/^0/, '62'),
        message: body,
        session: "628112971117", 
      };
  
      const response = await axios.post(
        "https://wa.sekolahmusik.co.id/api/send",
        wabody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data || [];
    } catch (error) {
     throw error;
    }
  };