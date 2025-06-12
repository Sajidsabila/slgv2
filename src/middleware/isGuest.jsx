import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { urlLink } from "../config/config";


export const Guest = ({ children }) => {
    const [isGuest, setIsGuest] = useState(null);

    useEffect(() => {
        const checkGuest = async () => {
            try {
                const response = await fetch(`${urlLink.url}/api/method/frappe.auth.get_logged_user`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Unauthorized");
                setIsGuest(false);
            } catch (error) {
              
                localStorage.clear();
                setIsGuest(true);
            }
        };

        checkGuest();
    }, []);

    if (isGuest === null) return null;
    return isGuest ? children : <Navigate to="/admin" replace />;
};

export const GuestStudent = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkStudentAuth = () => {
            const getStudentId = sessionStorage.getItem("token");
            setIsAuthenticated(!!getStudentId);
        };
        checkStudentAuth();
    }, []);

    if (isAuthenticated === null) return null;

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return children;
};