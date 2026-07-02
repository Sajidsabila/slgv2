import { createContext, useContext, useEffect, useState } from "react";
import { getResourceWithPagination } from "../api/apiMethod";

const StudentAttandanceContext = createContext({
  studentAttandance: [],
  setStudentAttandance: () => {},
  startDate: "",
  setStartDate: () => {},
  endDate: "",
  setEndDate: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
  loading: false,
  currentPage: 1,
  setCurrentPage: () => {},
  pageSize: 9,
  total: 0,
  totalPages: 1,
});

export const StudentAttandanceProvider = ({ children }) => {
  const [studentAttandance, setStudentAttandance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const getAttendance = async () => {
      setLoading(true);

      try {
        const filters = [];
        const orFilters = [];

        if (searchTerm) {
          orFilters.push(
            ["instructorlink_name", "like", `%${searchTerm}%`],
            ["sg_program", "like", `%${searchTerm}%`],
            ["lesson", "like", `%${searchTerm}%`],
            ["video", "like", `%${searchTerm}%`]
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
  }, [startDate, endDate, searchTerm, currentPage, pageSize]);

  return (
    <StudentAttandanceContext.Provider
      value={{
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
      }}
    >
      {children}
    </StudentAttandanceContext.Provider>
  );
};

export const useGetStudentAttandance = () => {
  const context = useContext(StudentAttandanceContext);

  if (!context) {
    throw new Error(
      "useGetStudentAttandance must be used within a StudentAttandanceProvider"
    );
  }

  return context;
};