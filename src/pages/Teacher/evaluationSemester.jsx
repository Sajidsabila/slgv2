import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import LandingPageLayout from "../../layout/landing-page";
import { apiGetProgramMateriPublic } from "../../api/apiPublic";
import { capitalAtWords } from "../../helper/helper";
const EvaluationSemesterTeacher = () => {
    const [programs, setPrograms] = useState([]);

  const getName = capitalAtWords(
    JSON.parse(sessionStorage.getItem("profileInstructor"))?.instructor_name || ""
  );

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

  console.log(programs);

  const uniqueCourses = useMemo(() => {
    return programs.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.class_course === value.class_course)

    );
  }, [programs]);

  return (
    <LandingPageLayout title="Learning Materi">
      <div className="container mx-auto px-4 py-10">
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
          {uniqueCourses.length > 0 ? (
            uniqueCourses.map((item) => (
              <Link
                to={`/teacher/evaluation-semester/class-course/${item.abbr_course}`}
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

export default EvaluationSemesterTeacher;