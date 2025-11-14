import { createContext, useContext, useEffect, useState } from "react";
import { getProgramEnrollment } from "../api/apiPublic";
import { methodGet } from "../api/apiMethod";

export const SyllabusContext = createContext();

export const SyllabusProvider = ({ children }) => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enroll
  const loadEnroll = async () => {
    try {
      const res = await  getProgramEnrollment();
      setEnroll(res);
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch materi
  const loadMateri = async () => {
    try {
      const res = await methodGet("Program Materi", {type: "Syllabus"});
      setMateri(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await loadEnroll();
      await loadMateri();
      setLoading(false);
    };

    fetchAll();
  }, []);

const enrollWithMateri = Array.isArray(materi) && Array.isArray(enroll) 
  ? materi.filter((item) =>
      enroll.some((m) => m.course === item.class_course)
    )
  : [];


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
