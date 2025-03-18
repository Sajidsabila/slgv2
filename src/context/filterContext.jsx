import { createContext, useContext, useState } from "react";

// Membuat context
const FilterContext = createContext();

// Provider untuk membungkus komponen yang butuh filter
export const FilterProvider = ({ children }) => {
    const [selectedCourses, setSelectedCourses] = useState([]);

    // Fungsi untuk menambah/menghapus course dari filter
    const handleFilterChange = (course) => {
        setSelectedCourses((prev) =>
            prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
        );
    };

    return (
        <FilterContext.Provider value={{ selectedCourses, handleFilterChange }}>
            {children}
        </FilterContext.Provider>
    );
};

// Hook untuk menggunakan contex
