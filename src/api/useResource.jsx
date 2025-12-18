// import { use } from "react";
// import axios from "axios";
// import { urlLink } from "../config/config";
// export const  useResourceGet = async (doctype) => {
//     try{
//         const token = sessionStorage.getItem("api_key");
//         const response = await axios.get(`${urlLink.url}/api/resource/${doctype}?fields=["*"]&limit_page_length=0&order_by=creation desc`,{
//         headers: {
//              Accept: "application/json",
//              Authorization: `token ${token}`,
//           },
//      });
//      return response.data?.data || [];
//     }catch(e){
//         throw e;
//     }
// };