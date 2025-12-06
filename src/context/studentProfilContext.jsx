import { createContext, useContext, useEffect, useState } from "react";
import { methodGet } from "../api/apiMethod";

const StudentProfilContext = createContext();

export const StudentProfilProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [program, setProgram] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await methodGet("Student");
        setProfile(res.data[0]);
      } catch {}
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await methodGet(
          "Program Enrollment",
          [["status", "=", "Approved"]],
          ["name", "class_name", "class_grading"]
        );
        setProgram(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgram();
  }, []);

        useEffect(() => {
        const fetchSchedule = async () => {
            try {
            const res = await methodGet(
                "Course Schedule",
                {},
                ["name", "schedule_date", "from_time", "to_time"]
            );

            //   agar jadwal yang tampil di minggu ini aja
            const today = new Date();
            const upcoming = res.data
                .map((item) => ({
                ...item,
                date: new Date(`${item.schedule_date}T${item.from_time}`),
                }))
                .filter((item) => item.date >= today)
                .sort((a, b) => a.date - b.date);

            setSchedule(upcoming.slice(0, 1)); 
            } catch (error) {
            console.log(error);
            }
        };

        fetchSchedule();
        }, []);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await methodGet(
          "Fees",
          {},
          ["name", "student_name", "outstanding_amount", "status", "posting_date"]
        );
        const sorted = res.data.sort(
          (a, b) => new Date(b.posting_date) - new Date(a.posting_date)
        );
        setFees(sorted[0] ? [sorted[0]] : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFees();
  }, []);

  return (
    <StudentProfilContext.Provider value={{ profile, program, schedule, fees }}>
      {children}
    </StudentProfilContext.Provider>
  );
};

export const useStudentProfil = () => useContext(StudentProfilContext);
