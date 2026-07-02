import { useEffect, createContext, useState, useContext } from "react";
import { getResourceWithPagination } from "../api/apiMethod";

const FeesContext = createContext({
    fees: [],
    setFees: () => {},
    startDate: "",
    endDate: "",
    setStartDate: () => {},
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

export const FeesProvider = ({ children }) => {
    const [fees, setFees] = useState([]);
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

        const getFees = async () => {
            try {
               setLoading(true);
                      const filters = [["docstatus", "!=", "2"]];
                      const orFilters = searchTerm ?
                        [
                            ["name", "like", `%${searchTerm}%`],
                            ["student_name", "like", `%${searchTerm}%`],
                            ["program", "like", `%${searchTerm}%`],
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
    }, [startDate, endDate, currentPage, pageSize, searchTerm]);

    return ( 
        <FeesContext.Provider
            value={{
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
            }}
        >
            {children}
        </FeesContext.Provider>
    )
}

export const useFees = () =>
{
    const context = useContext(FeesContext);
    if (!context) throw new Error("useFees must be used within a FeesProvider");
    return context;
} 