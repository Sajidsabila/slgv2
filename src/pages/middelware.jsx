import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Middleware = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SISTER_URL}/api/method/frappe.auth.get_logged_user`, {
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
