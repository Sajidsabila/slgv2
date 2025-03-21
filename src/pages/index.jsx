
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import LandingPageLayout from "../layout/landing-page";
import { apiGetProgramMateriPublic } from "../api/apiPublic";

const Index = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const res = await apiGetProgramMateriPublic();
        console.log("Response API:", res); 
        setPrograms(Array.isArray(res) ? res : []); 
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };
    getPrograms();
  }, []);

  const uniqueCourses = useMemo(() => {
    return programs.filter((value, index, self) =>
      index === self.findIndex((t) => t.class_course === value.class_course)
    );
  }, [programs]);

  console.log("Unique Courses:", uniqueCourses); // Debugging

  return (
    <LandingPageLayout title="Welcome to SMI">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Pilihan Class Course
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueCourses.length > 0 ? (
            uniqueCourses.map((item) => (
              <Link
                to={`/class-course/${item.abbr_course}`} // Menggunakan abbr_course dalam URL
                key={item.abbr_course} // Menggunakan abbr_course sebagai key
                className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <p className="text-lg font-semibold text-gray-700 text-center">
                  {item.class_course} {/* Menampilkan class_course */}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">Data Kosong</p>
          )}
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default Index;
