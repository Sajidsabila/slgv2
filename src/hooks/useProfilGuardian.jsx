import { createContext, useContext, useEffect, useState } from "react";
import { methodGet } from "../api/apiMethod";

const ProfilGuardianContext = createContext();

export const GuardianProfilProvider = ({ children }) => {
    const [profil, setProfil] = useState({});
    const [listChildren, setListChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfilGuardian = async () => {
        try {
            const response = await methodGet("Guardian");
            setProfil(response.data[0] || {});
        } catch (e) {
            console.error(e);
        }
    };

    const fetchlistChildren = async () => {
        try {
            const response = await methodGet("Student");
            setListChildren(response.data || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const user = sessionStorage.getItem("user");

        if (!user) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    fetchProfilGuardian(),
                    fetchlistChildren(),
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    return (
        <ProfilGuardianContext.Provider
            value={{
                profil,
                setProfil,
                listChildren,
                setListChildren,
                loading,
                fetchProfilGuardian,
                fetchlistChildren,
            }}
        >
            {children}
        </ProfilGuardianContext.Provider>
    );
};

export const useProfilGuardian = () => useContext(ProfilGuardianContext);