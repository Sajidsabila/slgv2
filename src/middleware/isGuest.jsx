import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const Guest = ({ children }) => {
  const { user } = useAuth();
  

  if (user) {
 const roles = JSON.parse(sessionStorage.getItem("user"))?.roles;
    console.log(roles);
    const getItem = roles?.map((r) => r.role);
    const instructor = getItem?.includes("Instructor");
    const lms = getItem?.includes("LMS User");
    const student = getItem?.includes("Student");
    console.log("ini role", getItem);
    

    if (lms) return <Navigate to="/admin" replace />;
    if (student === "Student") return <Navigate to="/student/home" replace />;
    if (instructor === "Instructor") return <Navigate to="/teacher" replace />;
  }

  return children;
};


// export const GuestOnly = ({ children }) => {
// const user = sessionStorage.getItem("token");
//   if (user) {
//     return <Navigate to="/home" replace />;
//   }
//   return children;
// };
