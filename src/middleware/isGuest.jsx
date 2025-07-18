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

export const GuestOnly = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const studentToken = sessionStorage.getItem("token");
    const teacherToken = sessionStorage.getItem("credentials");

    setIsStudent(!!studentToken);
    setIsTeacher(!!teacherToken);
    setIsChecking(false);
  }, []);

  if (isChecking) return null;

  if (isStudent) return <Navigate to="/home" replace />;
  if (isTeacher) return <Navigate to="/teacher" replace />;

  return children;
};