import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Middleware = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const api_key = localStorage.getItem("api_key");
        const api_secret = localStorage.getItem("api_secret");

        if (!api_key && !api_secret) {
            setIsAuthenticated(false);
            return;
        }

        const checkAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SISTER_URL}/api/method/frappe.auth.get_logged_user`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `token ${api_key}:${api_secret}`,
                    },
                });

                if (!response.ok) throw new Error("Invalid token");

                setIsAuthenticated(true);
            } catch (error) {
                console.error("Auth Error:", error);
                localStorage.clear();
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

  
    if (isAuthenticated === null) return null;


    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default Middleware;
