import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LandingPageLayout from "../layout/landing-page";
import { apiGetProgramMateriPublic } from "../api/apiPublic";

const ClassGrade = () => {
  const { abbr_course } = useParams();
  const [programs, setPrograms] = useState([]);
  const [classFormats, setClassFormats] = useState([]);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const res = await apiGetProgramMateriPublic();
        console.log("Response API:", res); // Debugging
        setPrograms(res?.data || res || []); // Pastikan data ada
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };
    getPrograms();
  }, []);

  useEffect(() => {


    if (programs.length > 0) {
      const filteredFormats = programs
        .filter((item) => item.abbr_course === abbr_course)
        .map((item) => item.class_format, []);

      console.log("Filtered Class Formats:", filteredFormats); 

      setClassFormats([...new Set(filteredFormats)]);
    }
  }, [abbr_course, programs]);

  return (
    <LandingPageLayout title={`${abbr_course}`}>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Pilihan Class Format
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-center">
          {classFormats.length > 0 ? (
            classFormats.map((format, index) => (
              <div
                key={index}
                className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <p className="text-lg font-semibold text-gray-700 text-center">
                  {format}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Tidak ada format tersedia</p>
          )}
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default ClassGrade;
