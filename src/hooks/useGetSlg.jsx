import {useEffect, useState, useMemo } from "react";
import { getDataResource } from "../api/apiResourceUser";



export const useSlg = () => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnroll = async () => {
     if(!sessionStorage.getItem('user')) return
    const res = await getDataResource("Program Enrollment");
    setEnroll(res?.data ?? res);
  };

  const loadMateri = async () => {
     if(!sessionStorage.getItem('user')) return
    const res = await getDataResource("Program Materi", { type: "SLG" });
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

  return { loading, enroll, materi, enrollWithMateri };
  
};
