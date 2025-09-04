
import { useEffect, useState, useMemo, use } from "react";
import { Link } from "react-router-dom";
import LandingPageLayout from "../layout/landing-page";
import { apiGetProgramMateriPublic } from "../api/apiPublic";
import { capitalAtWords, getEnrollment } from "../helper/helper";
import { methodGet } from "../api/apiMethod";

const Index = () => {
  const [programs, setPrograms] = useState([]);
  const enroll = getEnrollment();
  const getName =  capitalAtWords(JSON.parse(sessionStorage.getItem("token"))?.student_name || "");
  const enrollClassCourse = enroll.map(item =>
      typeof item.program === 'string' ? item.course : ''
  );
  useEffect(() => {
    const getProgramEnrollment = async () => {
      try {
        const response = await methodGet({url: "getProgramEnrollment"});
        setPrograms(response);
      }catch(error){
        console.error("Error fetching program data:", error);
      }
    }
  })
  useEffect(() => {
    const getPrograms = async () => {
      try {
        const res = await apiGetProgramMateriPublic();
        setPrograms(Array.isArray(res) ? res : []); 
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };
    getPrograms();
  }, []);

  
  const uniqueCourses = useMemo(() => {
      const filteredeStudentProgramEnrollment = programs.filter(p =>
        enrollClassCourse.includes(p.class_course ?? "")
      )
    return filteredeStudentProgramEnrollment.filter((value, index, self) =>
      index === self.findIndex((t) => t.class_course === value.class_course)
    );
  }, [programs]);
 

  return (
    <LandingPageLayout title="Welcome to SMI">
  <div className="container mx-auto px-4 py-10">
      <div className="flex justify-center mb-6">
      <Link
        to="/history-absensi"
        className="text-white bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
      >
        History Attendance
      </Link>
    </div>
    <h1 className="text-3xl font-bold text-center text-sky-700 mb-2">
      Selamat Datang {getName} di Student Learning Guide
    </h1>
    <p className="text-center text-gray-600 mb-8">
      Silakan pilih program atau kelas yang tersedia di bawah ini.
    </p>

    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Pilihan Class Course
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {enroll.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          Anda Belum Memiliki Program Enrollment
        </p>
      ) : uniqueCourses.length > 0 ? (
        uniqueCourses.map((item) => (
          <Link
            to={`/class-course/${item.abbr_course}`}
            key={item.abbr_course}
            className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <p className="text-lg font-semibold text-gray-700 text-center">
              {item.class_course}
            </p>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          Data Program Materi Masih Kosong
        </p>
      )}
    </div>
  </div>
</LandingPageLayout>

  );
};

export default Index;
