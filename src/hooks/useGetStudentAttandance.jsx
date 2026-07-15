import {  useEffect, useState } from "react";
import { getResourceWithPagination } from "../api/apiResourceUser";
export const useGetStudentAttandance = () => {
  const [studentAttandance, setStudentAttandance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  },[startDate, endDate, debounce]);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebounce(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    const getAttendance = async () => {
      setLoading(true);

      try {
        const filters = [];
        const orFilters = [];

        if (debounce) {
          orFilters.push(
            ["instructorlink_name", "like", `%${debounce}%`],
            ["sg_program", "like", `%${debounce}%`],
            ["lesson", "like", `%${debounce}%`],
            ["video_url", "like", `%${debounce}%`]
          );
        }

        if (startDate && endDate) {
          filters.push(["schedule_date", "between", [startDate, endDate]]);
        } else if (startDate) {
          filters.push(["schedule_date", ">=", startDate]);
        } else if (endDate) {
          filters.push(["schedule_date", "<=", endDate]);
        }

        const response = await getResourceWithPagination(
          "Student Attendance",
          filters,
          orFilters,
          ["*"],
          currentPage,
          pageSize
        );

        setStudentAttandance(response?.data || []);
        setTotal(response.total || 0);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Get Student Attendance Error:", error);

        setStudentAttandance([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    getAttendance();
  }, [startDate, endDate, debounce, currentPage, pageSize]);

  return {
        studentAttandance,
        setStudentAttandance,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchTerm,
        setSearchTerm,
        loading,
        currentPage,
        setCurrentPage,
        pageSize,
        total,
        totalPages,
};
};
