import axios from "axios";
import { urlLink } from "../config/config";
import axiosConfig from "../config/axiosConfig";

export const updatePassword = async (data) => {
  try {
    const response = await axiosConfig.post(
      `${urlLink.url}/api/method/frappe.core.doctype.user.user.update_password`,
      data);
    return response.data || [];
  } catch (error) {
    throw error;
  }
};

export const methodGet = async (doctype, filters = {}, fields = ["*"]) => {
  try {
    const filterParam = encodeURIComponent(JSON.stringify(filters));
    const fieldParam = encodeURIComponent(JSON.stringify(fields));

    const response = await axiosConfig.get(
      `/api/resource/${doctype}?fields=${fieldParam}&filters=${filterParam}&limit_page_length=None`);

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getResourceWithPagination = async (
  doctype,
  filters = [],
  orFilters = [],
  fields = ["*"],
  page = 1,
  pageSize = 9

) => {
  try {
    const start = (page - 1) * pageSize;
    // Data per halaman
    const { data: resourceResponse } = await axiosConfig.get(
      `/api/resource/${doctype}`,
      {
        params: {
          fields: JSON.stringify(fields),
          filters: JSON.stringify(filters),
          or_filters: JSON.stringify(orFilters),
          limit_start: start,
          limit_page_length: pageSize,
        },
      }
    );
    const { data: totalResponse } = await axiosConfig.get(
      `/api/resource/${doctype}`,
      {
        params: {
          fields: JSON.stringify(["name"]),
          filters: JSON.stringify(filters),
          limit_page_length: 0,
        },
      }
    );
    const total = totalResponse.data.length;
    return {
      data: resourceResponse.data,
      total,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error("Pagination Error:", error.response?.data || error);
    throw error;
  }
};
export const method = async (url) => {
  try {
    const response = await axiosConfig.get(`/api/method/${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailData = async ({ doctype, id }) => {
  try {
    const response = await axios.get(
      `${urlLink.url}/api/resource/${doctype}/${id}?fields=["*"]`,
      {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authStudent = async (data) => {
  try {
    const response = await axios.post(
      `${urlLink.url}/api/method/smi.helper.login_auth`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return response.data || [];
  } catch (error) {
    throw error;
  }
};

export const apiMethodPost = async (data) =>{
  try {
    const response = await axiosConfig.post(
      `${urlLink.url}/api/method/smi.helper.get_data_fees`,
      data
    )
    return response.data || [];
  } catch (error) {
    throw error;
  }
}

// export const refreshAccesToken = async () => {
//   const token = sessionStorage.getItem("token");
//   const refresh_token = sessionStorage.getItem("refresh_token");
//   if (!refresh_token && !token) return null;
//   try {
//     const response = await axios.post(
//       `${urlLink.url}/api/method/smi.helper.refresh_access_token`,
//       { refresh_token },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     const newToken = response.data?.access_token;
//     if (newToken && newToken !== token) {
//       sessionStorage.setItem("token", newToken);
//       return newToken;
//     }
//     return token;
//   } catch (error) {
//     sessionStorage.clear();
//   }
// };

// export const methodLogout = async () => {
//   const token = sessionStorage.getItem("token");
//   const refresh_token = sessionStorage.getItem("refresh_token");
//   if (!refresh_token && !token) return null;
//   try {
//     const response = await axios.post(
//       `${urlLink.url}/api/method/smi.helper.logout`,
//       { refresh_token: refresh_token },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//   } catch (error) {
//     sessionStorage.clear();
//   } finally {
//     sessionStorage.clear();
//   }
// };
