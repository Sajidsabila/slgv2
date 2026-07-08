import {useEffect, useState, useMemo } from "react";
import { getDataResource } from "../api/apiResourceUser";

export const useExamSpeciment = () => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnroll = async () => {
    try {
      if(!sessionStorage.getItem('user')) return
      const res = await  getDataResource("Program Enrollment");
      setEnroll(res?.data ?? res); // aman
    } catch (e) {
      console.log(e);
    }
  };

  const loadMateri = async () => {
    try {
      if(!sessionStorage.getItem('user')) return
      const res = await getDataResource("Program Materi", { type: "Exam Specimen" });
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

  return {
        loading,
        enroll,
        materi,
        enrollWithMateri,
      }
};

