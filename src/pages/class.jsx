import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import LandingPageLayout from "../layout/landing-page";
import { apiGetProgramMateriPublic } from "../api/apiPublic";

const ClassGrades = () => {
  const { abbr_course } = useParams();
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const res = await apiGetProgramMateriPublic();
        console.log("Response API Data:", res);
        setPrograms(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error fetching program data:", error);
        setError("Gagal mengambil data program.");
      }
    };
    getPrograms();
  }, []);

  const classFormats = useMemo(() => {
    if (!programs.length) return [];

   
    const filteredData = programs.filter((item) => item.abbr_course === abbr_course);
    const groupedFormats = {};
    filteredData.forEach((item) => {
      if (!groupedFormats[item.abbr_format]) {
        groupedFormats[item.abbr_format] = [];
      }
      if (!groupedFormats[item.abbr_format].includes(item.abbr_grade)) {
        groupedFormats[item.abbr_format].push(item.abbr_grade);
      }
    });

    console.log("Grouped Class Formats:", groupedFormats);
    return groupedFormats;
  }, [abbr_course, programs]);

  return (
    <LandingPageLayout title={`${abbr_course}`}>
      <div className="flex justify-center min-h-screen px-4 py-10">
        <div className="max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
           Data
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-2 gap-6 content-center">
            {Object.keys(classFormats).length > 0 ? (
              Object.entries(classFormats).map(([format, grades], index) => (
                <div key={index} className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg text-center">
                  <p className="text-lg font-semibold text-gray-700 mb-3">{format}</p>
                  <div className="flex flex-col gap-2">
                    {grades.map((grade, i) => (
                      <Link
                        key={i}
                        to={`/class-course/${abbr_course}/${format}/${grade}`}
                        className="block text-blue-600 hover:underline"
                      >
                        {grade}
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada format kelas tersedia</p>
            )}
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default ClassGrades;
