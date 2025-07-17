import { useEffect, useState } from "react";
import { getModulTrainingPublic } from "../../api/apiProgramMateri";
import LandingPageLayout from "../../layout/landing-page";
import { Link } from "react-router-dom";
const CalenderAcademicTeacher = () => {
    const [bookMenu, setBookMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedCredentials = sessionStorage.getItem("credentials");
        if (!storedCredentials) return;

        const decoded = atob(storedCredentials);
        const response = await getModulTrainingPublic(decoded);
        setBookMenu(response);
        setFilteredMenu(response);
      } catch (error) {
        console.error("Gagal mengambil data modul:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = bookMenu.filter((book) =>
      book?.title?.toLowerCase().includes(search.toLowerCase()) && 
      book?.type === "Calender Academic"
    );
    setFilteredMenu(filtered);
  }, [search, bookMenu]);

  return (
    <LandingPageLayout title="Calender Academic">
      <div className="container mx-auto w-full flex-col gap-10 px-4 md:px-10">
        <div className="flex justify-center w-full my-6">
          <input
            className="w-full max-w-lg md:max-w-[800px] h-[50px] rounded-lg bg-white text-gray-800 text-base border border-gray-300 px-4 pr-28 py-2 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 hover:border-gray-400 shadow-md focus:shadow-lg transition"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pencarian Calender Academic..."
          />
        </div>

        <div className="w-full flex flex-col gap-7 py-3 mx-3">
          <div>
            <p className="text-white bg-slate-600 text-base md:text-lg font-semibold px-3 py-2 rounded-lg tracking-wide">
             Calender Academic
            </p>
         
            { loading ? (
                 <p className="text-center text-gray-600 py-5">Memuat data...</p>
            ) : 
            filteredMenu.length > 0 ? (
                 filteredMenu.map((book, index) => (
  <Link to="/" key={index}>
    <div className="w-full bg-white rounded-lg shadow px-6 py-4 mt-4 hover:bg-gray-50 transition flex items-start gap-5">
      
 
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold text-gray-700 text-lg">
        #{index + 1}
      </div>

      {/* Konten buku */}
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-gray-800">{book.title}</p>
        <p className="text-gray-600">{book.description}</p>
      </div>
      
    </div>
  </Link>
            ))
            ) : (
                  <p className="text-red-500 text-center bg-red-200 text-base md:text-lg font-bold px-3 py-2 rounded-lg tracking-wide my-7 mx-6">
                        Data tidak ditemukan...
                     </p>
            )
           }



          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
};



export default CalenderAcademicTeacher