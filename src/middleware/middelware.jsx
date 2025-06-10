
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { urlLink } from "../api/config";

const Middleware = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${urlLink.url}/api/method/frappe.auth.get_logged_user`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Unauthorized");
                }

                setIsAuthenticated(true);
            } catch (error) {
                console.error("Auth Error:");
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
