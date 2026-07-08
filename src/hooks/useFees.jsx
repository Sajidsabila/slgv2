import { useEffect, useState} from "react";
import { getResourceWithPagination } from "../api/apiResourceUser";


export const useFees= () => {
    const [fees, setFees] = useState([]);
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
        if (!token) return;

        const getFees = async () => {
            try {
               setLoading(true);
                      const filters = [["docstatus", "!=", "2"]];
                      const orFilters = debounce ?
                        [
                            ["name", "like", `%${debounce}%`],
                            ["student_name", "like", `%${debounce}%`],
                            ["program", "like", `%${debounce}%`],
                        ] : [];
              
                      if (startDate && endDate) {
                        filters.push([
                          "due_date",
                          "between",
                          [startDate, endDate],
                        ]);
                      } else if (startDate) {
                        filters.push(["due_date", ">=", startDate]);
                      } else if (endDate) {
                        filters.push(["due_date", "<=", endDate]);
                      }
              
                      const response = await getResourceWithPagination(
                        "Fees",
                        filters,
                        orFilters,
                        ["*"],
                        currentPage,
                        pageSize
                      );
              
                      setFees(response.data || []);
                      setTotal(response.total);
                      setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Get Fees Error:", error);
                setFees([]);
                setTotal(0);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        }
    getFees();
    }, [startDate, endDate, currentPage, pageSize, debounce]);

        return {
                fees,
                setFees,
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