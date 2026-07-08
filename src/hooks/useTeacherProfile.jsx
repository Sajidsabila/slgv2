import { useEffect, useState } from "react";
import { getDataResource, getResourceWithPagination } from "../api/apiResourceUser";
export const useTeacherProfile = () => {
    const [teacher, setTeacher] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debounce, setDebounce] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(9);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(searchTerm);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debounce]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const getTeacher = async() => {
            try{
                const response = await getDataResource("Instructor");
                setTeacher(response.data[0]);
            }catch(error){
                console.log(error);
            }
        }   
        getTeacher();
    }, []);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

    const getStudentList = async() => {
        setLoading(true);
        try{
        const filters = [];
        const orFilters = debounce ? 
        [
            ["first_name", "like", `%${debounce}%`]] 
        : [];

        const response = await getResourceWithPagination(
                  "Student",
                    filters,
                  orFilters,
                  ["*"],
                  currentPage,
                  pageSize
                );        
                setStudentList(response.data);
                setTotal(response.total || 0);
                setTotalPages(response.totalPages || 1);
        }catch(error){
            console.log(error);
            setStudentList([]);
            setTotal(0);
            setTotalPages(1);
        }finally{
            setLoading(false);
        }
        }
        getStudentList();
    }, [currentPage, pageSize, debounce]);

    return { teacher, 
        studentList, 
        searchTerm, 
        setSearchTerm, 
        setCurrentPage,
        setTotalPages,
        loading, 
        currentPage, 
        pageSize, 
        total, 
        totalPages
    };
}