import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getProgramEnrollment } from "../api/apiPublic";
import { methodGet } from "../api/apiMethod";

export const SyllabusContext = createContext();

export const SyllabusProvider = ({ children }) => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnroll = async () => {
    try {
       if(!sessionStorage.getItem('user')) return
      const res = await getProgramEnrollment();
      setEnroll(res?.data ?? res); // aman untuk berbagai tipe response
    } catch (e) {
      console.log(e);
    }
  };

  const loadMateri = async () => {
    try {
           if(!sessionStorage.getItem('user')) return
      const res = await methodGet("Program Materi", { type: "Syllabus" });
      setMateri(res?.data ?? []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // fetch paralel → jauh lebih cepat
        await Promise.all([loadEnroll(), loadMateri()]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Hitung enrollWithMateri secara sinkron dan optimal
  const enrollWithMateri = useMemo(() => {
    if (!Array.isArray(materi) || !Array.isArray(enroll)) return [];
    return materi.filter((item) =>
      enroll.some((m) => m.course === item.class_course)
    );
  }, [enroll, materi]);

  return (
    <SyllabusContext.Provider
      value={{
        loading,
        enroll,
        materi,
        enrollWithMateri,
      }}
    >
      {children}
    </SyllabusContext.Provider>
  );
};

export const useSyllabus = () => useContext(SyllabusContext);
