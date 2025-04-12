import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Guest = ({ children }) => {
    const [isGuest, setIsGuest] = useState(null);

    useEffect(() => {
        const checkGuest = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SISTER_URL}/api/method/frappe.auth.get_logged_user`, {
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

export default Guest;
