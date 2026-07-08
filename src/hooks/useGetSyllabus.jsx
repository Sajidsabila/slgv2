import { useEffect, useState, useMemo } from "react";
import { getDataResource } from "../api/apiResourceUser";


export const useSyllabus = () => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnroll = async () => {
    try {
       if(!sessionStorage.getItem('user')) return
      const res = await getDataResource("Program Enrollment");
      setEnroll(res?.data ?? res); // aman untuk berbagai tipe response
    } catch (e) {
      console.log(e);
    }
  };

  const loadMateri = async () => {
    try {
      if(!sessionStorage.getItem('user')) return
      const res = await getDataResource("Program Materi", { type: "Syllabus" });
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

  return {
        loading,
        enroll,
        materi,
        enrollWithMateri,
      };
};
