import { useEffect, useState, useMemo } from "react";
import { getDataResource } from "../api/apiResourceUser";
export const useLearningMateri = ({type}) => {
  const [enroll, setEnroll] = useState([]);
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnroll = async () => {
    if(!sessionStorage.getItem('user')) return
    const res = await getDataResource("Program Enrollment");
    setEnroll(res?.data ?? []);
  };

  const loadMateri = async () => {
     if(!sessionStorage.getItem('user')) return
    const res = await getDataResource("Program Materi", { type: type });
    setMateri(res?.data ?? []);
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        await Promise.all([loadEnroll(), loadMateri()]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [type]);

  const enrollWithMateri = useMemo(() => {
    if (!Array.isArray(enroll) || !Array.isArray(materi)) return [];
    return materi.filter((item) =>
      enroll.some((m) => m.course === item.class_course)
    );
  }, [enroll, materi]);

  return { loading, enrollWithMateri };
};

