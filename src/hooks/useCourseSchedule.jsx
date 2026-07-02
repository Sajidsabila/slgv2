import { createContext, useContext, useEffect, useState } from "react";
import { methodGet, getResourceWithPagination } from "../api/apiMethod";

const CourseScheduleContext = createContext({
  courseSchedule: [],
  studentGroup: null,
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

export const CourseScheduleProvider = ({ children }) => {
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [studentGroup, setStudentGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

// ambil student group 
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const getStudentGroup = async () => {
      try {
        const profile = await methodGet("Student");

        const studentGroup = await methodGet(
          "Student Group",
          [["Student Group Student", "student", "=", profile.data[0].name]],
          ["name"]
        );

        setStudentGroup(studentGroup.data?.[0]?.name ?? null);
      } catch (error) {
        console.error("Get Student Group Error:", error);
      }
    };

    getStudentGroup();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token || !studentGroup) return;

    const getCourseSchedule = async () => {
      try {
        setLoading(true);
        const filters = [
          ["student_group", "=", studentGroup], 
        ];
       const orFilters = searchTerm
        ? [
            ["room", "like", `%${searchTerm}%`],
            ["program", "like", `%${searchTerm}%`],
            ["instructor_name", "like", `%${searchTerm}%`],
          ]
        : [];

        if (startDate && endDate) {
          filters.push([
            "schedule_date",
            "between",
            [startDate, endDate],
          ]);
        } else if (startDate) {
          filters.push(["schedule_date", ">=", startDate]);
        } else if (endDate) {
          filters.push(["schedule_date", "<=", endDate]);
        }

        const response = await getResourceWithPagination(
          "Course Schedule",
          filters,
          orFilters,
          ["*"],
          currentPage,
          pageSize
        );

        setCourseSchedule(response.data || []);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Get Course Schedule Error:", error);
        setCourseSchedule([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    getCourseSchedule();
  }, [studentGroup, startDate, endDate, currentPage, pageSize, searchTerm]);

  // filter data
  

  return (
    <CourseScheduleContext.Provider
      value={{
        courseSchedule,
        studentGroup,
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
    </CourseScheduleContext.Provider>
  );
};

export const useCourseSchedule = () => {
  const context = useContext(CourseScheduleContext);

  if (!context) {
    throw new Error(
      "useCourseSchedule must be used within a CourseScheduleProvider"
    );
  }

  return context;
};