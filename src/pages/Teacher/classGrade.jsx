import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import LandingPageLayout from "../../layout/landing-page";
import { apiGetProgramMateriPublic } from "../../api/apiPublic";


const ClassGradeTeacher = () => {
  const { abbr_course } = useParams();
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const res = await apiGetProgramMateriPublic();
        setPrograms(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error fetching program data:", error);
        setError("Gagal mengambil data program.");
      }
    };
    getPrograms();
  }, []);
  // const enroll = getEnrollment();
  //   const enrollGrade = enroll.map(item =>
  //       typeof item.class_grading === 'string' ? item.class_grading : ''
  //   );

  const classGrades = useMemo(() => {
    if (!programs.length || !abbr_course) return [];
    // const filteredStudentClassGrade = programs.filter(p => 
    //   enrollGrade.includes(p.class_grade ?? "")
    //  )

    return programs
      .filter((item) => item.abbr_course === abbr_course)
      .map((item) => ({
        class_grade: item.class_grade,
        name: item.name,
      }))
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.class_grade === value.class_grade)
      );
  }, [programs, abbr_course]);

  return (
    <LandingPageLayout title={abbr_course}>
      <div className="container mx-auto px-4 py-10">
     
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Data Class Grade
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {classGrades.length > 0 ? (
              classGrades.map((gradeData, i) => (
                <Link
                  key={i}
                  to={`/teacher/program-materi/${gradeData.name}`}
                  className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                   <p className="text-lg font-semibold text-gray-700 text-center">
                  {gradeData.class_grade}</p>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-center text-white h-8 py-1 text-sm md:text-md w-100 bg-slate-900 shadow-md rounded-lg">
                  Tidak ada data
                </p>
              </div>
            )}
          </div>
        </div>
    
      <div className="flex justify-center">
        <Link
          to="/teacher"
          className="bg-slate-900 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow-md my-2 text-center"
        >
          Home
        </Link>
      </div>
    </LandingPageLayout>
  );
};

export default ClassGradeTeacher;
