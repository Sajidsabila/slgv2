import { createContext, useContext, useEffect, useState } from "react";
import { getProgramEnrollment } from "../api/apiPublic";
import { methodGet } from "../api/apiMethod";

export const ExamSpecimentContext = createContext();

export const ExamSpecimentProvider = ({ children }) => {
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
      const res = await methodGet("Program Materi", {type: "Exam Specimen"});
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
      enroll.some((m) => m.course === item.class_course) &&
      enroll.some((m) => m.class_grading === item.class_grade)
    )
  : [];


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
