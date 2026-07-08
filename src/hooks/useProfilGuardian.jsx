import { useEffect, useState } from "react";
import { getDataResource } from "../api/apiResourceUser";


export const useProfilGuardian = () => {
    const [profil, setProfil] = useState({});
    const [listChildren, setListChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfilGuardian = async () => {
        try {
            const response = await getDataResource("Guardian");
            setProfil(response.data[0] || {});
        } catch (e) {
            console.error(e);
        }
    };

    const fetchlistChildren = async () => {
        try {
            const response = await getDataResource("Student");
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

    return {
                profil,
                setProfil,
                listChildren,
                setListChildren,
                loading,
                fetchProfilGuardian,
                fetchlistChildren,
            };
        };