import { useEffect, useState, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { urlLink } from "../config/config";
import { Spin } from "antd";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import axiosConfig from "../config/axiosConfig";

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
        const { data: logged } = await axiosConfig.get(
          `${urlLink.url}/api/method/frappe.auth.get_logged_user`,
        );
        const { data: userData } = await axiosConfig.get(
          `/api/resource/User/${logged.message}`,
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

  if (user && userRoles === undefined)
    return (
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
