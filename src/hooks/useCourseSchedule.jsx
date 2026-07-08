import { useEffect, useState } from "react";
import { getDataResource, getResourceWithPagination } from "../api/apiResourceUser";

export const useCourseSchedule = () => {
  const [courseSchedule, setCourseSchedule] = useState([]);
  const [studentGroup, setStudentGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [debounce, setDebounce] = useState("");
  const pageSize = 9

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const getStudentGroup = async () => {
      try {
        const profile = await getDataResource("Student");

        const studentGroup = await getDataResource(
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
    const timer = setTimeout(() => {
      setDebounce(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, debounce]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token || !studentGroup) return;

    const getCourseSchedule = async () => {
      try {
        setLoading(true);
        const filters = [
          ["student_group", "=", studentGroup], 
        ];
       const orFilters = debounce
        ? [
            ["room", "like", `%${debounce}%`],
            ["program", "like", `%${debounce}%`],
            ["instructor_name", "like", `%${debounce}%`],
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
  }, [studentGroup, startDate, endDate, currentPage, pageSize, debounce]);

  return {
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
     };
    };