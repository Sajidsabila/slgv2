import { useEffect, useState, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { urlLink } from "../config/config";
import { Spin } from "antd";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";


export const Middleware = () => {
  const { user, logout } = useAuth();
  const checked = useRef(false); 
  useEffect(() => {
    if (user && !checked.current) {
      checked.current = true;
      axios
        .get(`${urlLink.url}/api/method/frappe.auth.get_logged_user`, {
          withCredentials: true,
        })
        .catch(() => {
          logout();
        });
    }
  }, [user, logout]);

  if (!user) return <Navigate to="/login"/>;

  return <Outlet />;
};
export const MiddlewareStudent = () => {
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refresh_token");
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (!token || !refreshToken) {
      setValid(false);
      return;
    }

    axios.post(
      `${urlLink.url}/api/method/smi.helper.refresh_access_token`,
      { refresh_token: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => setValid(true)) 
    .catch(() => {
      sessionStorage.clear();
      setValid(false);            
    });
  }, [token, refreshToken]);
  if (valid === null) return null;
  if (!valid) return <Navigate to="/" replace />;

  return <Outlet />;
};

export const MiddlewareTeacher = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const credentials = sessionStorage.getItem("credentials");
    setIsAuthenticated(!!credentials);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login-teacher" replace />;

  return <Outlet />;
};


