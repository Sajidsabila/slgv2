// import { createContext, useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const studentAuthContext = createContext();

// const StudentsContextProvider = ({ children }) => {
//   const [studentToken, setStudentToken] = useState(() => {
//     try {
//       const access_token = sessionStorage.getItem("token");
//       const refresh_token = sessionStorage.getItem("refresh_token");
//       const student_id = sessionStorage.getItem("student_id");
//       return { access_token, refresh_token, student_id };
//     } catch (e) {
//       sessionStorage.clear();
//       return null;
//     }
//   });

//   useEffect(() => {
//     if (studentToken) {
//       sessionStorage.setItem("token", studentToken.access_token);
//       sessionStorage.setItem("refresh_token", studentToken.refresh_token);
//       sessionStorage.setItem("student_id", studentToken.student_id);
//     } else {
//       sessionStorage.clear();
//       return null;
//     }
//   }, [studentToken]);

//   const loginStudent = (data) => {
//     setStudentToken(data);
//     return true;
//   };

//   const logoutStudent = () => {
//     const access_token = sessionStorage.getItem("token");
//     const refresh_token = sessionStorage.getItem("refresh_token");
//     if (!refresh_token && !access_token ) return null;
//       try{
//         const response =  axios.post(`${urlLink.url}/api/method/smi.helper.logout`, {refresh_token : refresh_token}, {
//           headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${access_token}`,
//           },
//         });

//       }catch(error){
//         throw error;
//       }finally{
//           setStudentToken(null);
//           return true;
//       }
 
//   };

//   return (
//     <studentAuthContext.Provider
//       value={{ studentToken, loginStudent, logoutStudent }}
//     >
//       {children}
//     </studentAuthContext.Provider>
//   );
// };

// export default StudentsContextProvider;

// export const useAuthStudent = () => {
//   return useContext(studentAuthContext);
// };
