import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [data, setDataContext] = useState(null);

  const clearData = () => setDataContext(null);

  return (
    <StudentContext.Provider value={{ data, setDataContext, clearData }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudents must be used within a StudentsProvider");
  return context;
};
