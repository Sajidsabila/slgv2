import { createContext, useContext, useEffect, useState } from "react";
import { method, methodGet } from "../api/apiMethod";

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

      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
      const start = startOfWeek.toISOString().split("T")[0];
      const end = endOfWeek.toISOString().split("T")[0];
      const studGroup = await methodGet(
      "Student Group",
      [["Student Group Student", "student", "=", profileRes.data[0].name]],
      ["name"]
      );
      const getstudenGroupName = JSON.parse(JSON.stringify(studGroup.data))[0] || studGroup.data;
    // lebih ringan fiter dari api
      const scheduleRes = await methodGet(
        "Course Schedule",
        [
          ["schedule_date", ">=", start],
          ["schedule_date", "<=", end],
          ["student_group", "=", getstudenGroupName.name],
        ],
     
        ["name", "schedule_date", "from_time", "to_time"]
      );
      setSchedule(scheduleRes.data || []);
      console.log(scheduleRes.data)
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
