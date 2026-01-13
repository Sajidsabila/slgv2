import { createContext, useContext, useEffect, useState } from "react";
import { methodGet } from "../api/apiMethod";

const StudentProfilContext = createContext();

export const StudentProfilProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [program, setProgram] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [fees, setFees] = useState([]);

  // =student profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await methodGet("Student");
        setProfile(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  // profgram
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await methodGet(
          "Program Enrollment",
          [["status", "=", "Approved"]],
          ["name", "class_name", "class_grading", "course"]
        );
        setProgram(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgram();
  }, []);

  // scehedule (MINGGU INI SAJA) 
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await methodGet(
          "Course Schedule",
          {},
          ["name", "schedule_date", "from_time", "to_time"]
        );

        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

        const timezoneOffset = today.getTimezoneOffset() * 60000;

        const weekly = res.data
          .map((item) => {
            const localDate = new Date(`${item.schedule_date}T${item.from_time}`);
            return {
              ...item,
              date: new Date(localDate.getTime() - timezoneOffset),
            };
          })
          .filter(
            (item) =>
              item.date >= startOfWeek &&
              item.date <= endOfWeek
          )
          .sort((a, b) => a.date - b.date);

        // kalau gak ada jadwal minggu ini, kosongin aja
        setSchedule(weekly.length > 0 ? [weekly[0]] : []);
      } catch (error) {
        console.log(error);
        setSchedule([]); 
      }
    };

    fetchSchedule();
  }, []);
  // fees
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
    <StudentProfilContext.Provider
      value={{ profile, program, schedule, fees }}
    >
      {children}
    </StudentProfilContext.Provider>
  );
};

export const useStudentProfil = () => useContext(StudentProfilContext);