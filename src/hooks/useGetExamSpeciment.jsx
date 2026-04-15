import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { getProgramEnrollment } from "../api/apiPublic";
import { methodGet } from "../api/apiMethod";

export const ExamSpecimentContext = createContext();

export const ExamSpecimentProvider = ({ children }) => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnroll = async () => {
    try {
           if(!sessionStorage.getItem('user')) return
      const res = await getProgramEnrollment();
      setEnroll(res?.data ?? res); // aman
    } catch (e) {
      console.log(e);
    }
  };

  const loadMateri = async () => {
    try {
           if(!sessionStorage.getItem('user')) return
      const res = await methodGet("Program Materi", { type: "Exam Specimen" });
      setMateri(res?.data ?? []); // aman
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // jalankan API paralel → lebih cepat
        await Promise.all([loadEnroll(), loadMateri()]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Filter materi berdasarkan enrollment (course & grade)
  const enrollWithMateri = useMemo(() => {
    if (!Array.isArray(materi) || !Array.isArray(enroll)) return [];

    return materi.filter((item) =>
      enroll.some(
        (m) =>
          m.course === item.class_course &&
          m.class_grading === item.class_grade
      )
    );
  }, [enroll, materi]);

  return (
    <ExamSpecimentContext.Provider
      value={{
        loading,
        enroll,
        materi,
        enrollWithMateri,
      }}
    >
      {children}
    </ExamSpecimentContext.Provider>
  );
};

export const useExamSpeciment = () => useContext(ExamSpecimentContext);
