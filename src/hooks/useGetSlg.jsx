import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getProgramEnrollment } from "../api/apiPublic";
import { methodGet } from "../api/apiMethod";

export const SlgContext = createContext();

export const SlgProvider = ({ children }) => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnroll = async () => {
     if(!sessionStorage.getItem('user')) return
    const res = await getProgramEnrollment();
    setEnroll(res?.data ?? res);
  };

  const loadMateri = async () => {
     if(!sessionStorage.getItem('user')) return
    const res = await methodGet("Program Materi", { type: "SLG" });
    setMateri(res?.data ?? []);
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Fetch paralel → lebih cepat
        await Promise.all([loadEnroll(), loadMateri()]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const enrollWithMateri = useMemo(() => {
    if (!Array.isArray(enroll) || !Array.isArray(materi)) return [];
    return materi.filter((item) =>
      enroll.some((m) => m.course === item.class_course)
    );
  }, [enroll, materi]);

  return (
    <SlgContext.Provider
      value={{ loading, enroll, materi, enrollWithMateri }}
    >
      {children}
    </SlgContext.Provider>
  );
};

export const useSlg = () => useContext(SlgContext);
