import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Guest = ({ children }) => {
    const [isGuest, setIsGuest] = useState(null);

    useEffect(() => {
        const api_key = localStorage.getItem("api_key"); 
        const api_secret = localStorage.getItem("api_secret");
        if (!api_key && !api_secret) {
            setIsGuest(true);
            return;
        }
        const checkGuest = async () => {
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
                setIsGuest(false);
            } catch (error) {
                console.error("Auth Error:", error);
                localStorage.clear();
                setIsGuest(true);
            }
        };

        checkGuest();
    }, []);
    if (isGuest === null) return <Navigate to="/login" replace />;

    return isGuest ? children : <Navigate to="/admin" replace />;
};

export default Guest;
