import { useEffect, useState, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { urlLink } from "../config/config";
import { Spin } from "antd";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";



export const Middleware = ({ allowed }) => {
  const { user, logout } = useAuth();
  const [userRoles, setUserRoles] = useState(undefined);
  const checked = useRef(false);
  const location = useLocation().pathname;

  useEffect(() => {
    const checkUser = async () => {
      if (!user || checked.current) return;
      checked.current = true;
      try {
        const { data: logged } = await axios.get(
          `${urlLink.url}/api/method/frappe.auth.get_logged_user`,
          { withCredentials: true }
        );
        const { data: userData } = await axios.get(
          `${urlLink.url}/api/resource/User/${logged.message}`,
          { withCredentials: true }
        );

        const roles = userData.data.roles.map((r) => r.role);
        setUserRoles(roles);
      } catch (error) {
        console.error("Middleware error:", error);
        logout();
      }
    };

    checkUser();
  }, [user, logout]);

  if (user && userRoles === undefined) return (
    <div className="flex items-center justify-center h-screen">
      <Spin />
    </div>
  );

  if (!user) {
    if (location.startsWith("/admin")) return <Navigate to="/login" replace />;
    if (location.startsWith("/teacher") || location.startsWith("/student"))
      return <Navigate to="/" replace />;
  }

  if (user && userRoles && !allowed.some((role) => userRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


// export const MiddlewareStudent = () => {
//   const token = sessionStorage.getItem("token");
//   const refreshToken = sessionStorage.getItem("refresh_token");
//   const [valid, setValid] = useState(null);

//   useEffect(() => {
//     if (!token || !refreshToken) {
//       setValid(false);
//       return;
//     }

//     axios.post(
//       `${urlLink.url}/api/method/smi.helper.refresh_access_token`,
//       { refresh_token: refreshToken },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then(() => setValid(true)) 
//     .catch(() => {
//       sessionStorage.clear();
//       setValid(false);            
//     });
//   }, [token, refreshToken]);
//   if (valid === null) return null;
//   if (!valid) return <Navigate to="/" replace />;

//   return <Outlet />;
// };

// export const MiddlewareTeacher = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const credentials = sessionStorage.getItem("credentials");
//     setIsAuthenticated(!!credentials);
//   }, []);

//   if (isAuthenticated === null) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) return <Navigate to="/login-teacher" replace />;

//   return <Outlet />;
// };