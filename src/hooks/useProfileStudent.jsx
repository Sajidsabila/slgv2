import { createContext, useContext, useEffect, useState } from "react";
import { methodGet } from "../api/apiMethod";

const StudentProfilContext = createContext();

export const StudentProfilProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [program, setProgram] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfileData = async () => {
    setLoading(true);
       if(!sessionStorage.getItem('user')) return
    try {
      // Profile
   
      const profileRes = await methodGet("Student");
      setProfile(profileRes.data[0] || {});

      // Program

      const programRes = await methodGet(
        "Program Enrollment",
        [["status", "=", "Approved"]],
        ["name", "class_name", "class_grading", "course"],
      );
      setProgram(programRes.data || []);

      // hanay muncul jadwal di minggu ini aja
      const scheduleRes = await methodGet(
        "Course Schedule",
        [["student_name", "=", profileRes.data[0].name]],
        ["name", "schedule_date", "from_time", "to_time"],
      );
      console.log("ini schedule res", scheduleRes);
      // console.log("ini schedule res", scheduleRes);
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
      const timezoneOffset = today.getTimezoneOffset() * 60000;

      const weekly = (scheduleRes.data || [])
        .map((item) => {
          const date = new Date(item.schedule_date);
          const localDate = new Date(`${date}T${item.from_time}`);
          return {
            ...item,
            date: new Date(localDate.getTime() - timezoneOffset),
          };
        })
        .filter((item) => item.date >= startOfWeek && item.date <= endOfWeek)
        .sort((a, b) => a.date - b.date);

      setSchedule(weekly.length > 0 ? [weekly[0]] : []);

      // Fees
      const feesRes = await methodGet("Fees", {}, [
        "name",
        "student_name",
        "outstanding_amount",
        "status",
        "posting_date",
      ]);
      const sorted = (feesRes.data || []).sort(
        (a, b) => new Date(b.posting_date) - new Date(a.posting_date),
      );
      setFees(sorted[0] ? [sorted[0]] : []);
    } catch (error) {
      console.error("Terjadi kesalahan ", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // refresh data setelah pop up ditutup
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <StudentProfilContext.Provider
      value={{
        profile,
        program,
        schedule,
        fees,
        refreshProfileData: fetchProfileData,
        loading,
      }}
    >
      {children}
    </StudentProfilContext.Provider>
  );
};

export const useStudentProfil = () => useContext(StudentProfilContext);
