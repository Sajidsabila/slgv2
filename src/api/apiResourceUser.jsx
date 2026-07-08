import axios from "axios";
import { urlLink } from "../config/config";
import axiosConfig from "../config/axiosConfig";


export const checkStudent = async (data) => {
  try {
    const response = await axios.post(
      `${urlLink.url}/api/method/erpnext.education.doctype.student.student.login_auth`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    // console.log(response.data);
    return response || [];
  } catch (error) {
    throw error;
  }
};



export const updateStudent = async (data, id) => {
  try {
    const token = sessionStorage.getItem("api_key");
    const response = await axiosConfig.put(
      `${urlLink.url}/api/resource/Student/${id}`,
      data);
    return response.data?.data || [];
  } catch (error) {
    throw error;
  }
};



export const getDoctypeDetail = async (doctype, id) => {
  try {
    const response = await axiosConfig.get(
      `/api/resource/${doctype}/${id}`);
    return response.data?.data || [];
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

export const getDataResource = async (doctype, filters = {}, fields = ["*"]) => {
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
